// 3rd Party Libraries
import { useState, useEffect } from '@wordpress/element';
import Fuse from 'fuse.js';

// Types
import { PrettyEventData, RawEventPost } from '../../types';

// Utilities
import Model from '../../Model';
import { sortEvents, fuzzySearchKeys, destructureData } from '../Utilities';
import { getTimeSortedEvents } from '../../../my-schedule/eventFunctions';

export function useSearchPosts(search, dispatch) {
	const [isLoading, setIsLoading] = useState(false);
	const [posts, setPosts] = useState<PrettyEventData[]>([]);
	function doFirstSearch(data) {
		const { events } = data;
		dispatch({
			type: 'updateCursor',
			payload: events.pageInfo.hasNextPage
				? events.pageInfo.endCursor
				: undefined,
		});
		const prettyEvents: PrettyEventData[] = events.nodes.map(
			(node: RawEventPost) => destructureData(node)
		);
		const sortedEvents: PrettyEventData[] = Object.values(
			getTimeSortedEvents(sortEvents(prettyEvents))
		).flat();
		setPosts(sortedEvents);
		dispatch({ type: 'setFilters', payload: data });
	}

	useEffect(() => {
		setIsLoading(true);
		if ('' === search) {
			Model.getPosts()
				.then((data) => {
					if (undefined === data) return;
					doFirstSearch(data);
					setIsLoading(false);
				})
				.catch((err) => console.error(err));
		} else {
			const timeout = setTimeout(() => {
				const searchOptions = {
					...fuzzySearchKeys,
					minMatchCharLength: 3,
					includeScore: true,
					threshold: 0.3,
				};
				const fuse = new Fuse(
					Object.values(posts).flat(),
					searchOptions
				);
				const results = fuse.search(search);
				setPosts(results.map((result) => result.item));
				setIsLoading(false);
			}, 350);
			return () => clearTimeout(timeout);
		}
	}, [search]);

	return { isLoading, posts };
}

export function useGetMorePosts(cursor, isVisible, dispatch) {
	const [posts, setPosts] = useState<PrettyEventData[]>([]);

	useEffect(() => {
		if (cursor && isVisible) {
			Model.getPosts(cursor)
				.then((data) => {
					if (undefined === data) return;
					const { events } = data;
					if (events.pageInfo.hasNextPage) {
						dispatch({
							type: 'updateCursor',
							payload: events.pageInfo.endCursor,
						});
					} else {
						dispatch({
							type: 'updateCursor',
							payload: undefined,
						});
					}
					const prettyEvents = events.nodes.map((node) =>
						destructureData(node)
					);
					const sortedEvents = getTimeSortedEvents(
						sortEvents(prettyEvents)
					);
					setPosts((prev) => [
						...prev,
						...Object.values(sortedEvents).flat(),
					]);
					dispatch({ type: 'intersecting', payload: false });
				})
				.catch((err) => console.error(err));
		}
	}, [isVisible]);

	return posts;
}
