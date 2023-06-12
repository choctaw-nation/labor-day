// 3rd Party Libraries
import { useState, useEffect } from '@wordpress/element';
import Fuse from 'fuse.js';

// Types
import { PrettyEventData, RawEventPost } from '../../types';

// Utilities
import Model from '../../Model';
import { sortEvents, fuzzySearchKeys, destructureData } from '../Utilities';
import { getTimeSortedEvents } from '../../../my-schedule/eventFunctions';

export function useSearchPosts(currentPosts, search, dispatch) {
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

		// dispatch({ type: 'updatePosts', payload: sortedEvents });
		setPosts(sortedEvents);
		dispatch({ type: 'setFilters', payload: data });
	}

	useEffect(() => {
		if ('' === search) {
			Model.getPosts()
				.then((data) => {
					if (undefined === data) return;
					doFirstSearch(data);
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
					Object.values(currentPosts).flat(),
					searchOptions
				);
				const results = fuse.search(search);
				setPosts(results.map((result) => result.item));
			}, 350);
			return () => clearTimeout(timeout);
		}
	}, [search]);

	return { posts };
}

export function useGetMorePosts(cursor, dispatch) {
	let posts: PrettyEventData[] = [];
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
			const sortedEvents = getTimeSortedEvents(sortEvents(prettyEvents));
			dispatch({
				type: 'updatePosts',
				payload: Object.values(sortedEvents).flat(),
			});
			dispatch({ type: 'intersecting', payload: false });
		})
		.catch((err) => console.error(err));

	return posts;
}
