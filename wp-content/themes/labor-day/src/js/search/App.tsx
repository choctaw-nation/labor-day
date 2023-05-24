import '../../styles/components/_hours-modal.scss';
import '../../styles/layouts/archives/_events-archive.scss';
import React, { useState, useEffect, createRoot } from '@wordpress/element';
import LoadingSpinner from '../spinner';
import Model from './Model';
import SearchBar from './Components/SearchBar';
import ResultsContainer from './Presentational/ResultsContainer';
import { EventPost, PrettyEventData, SortedEventsObject } from './types';
import { EventFilters } from './types/eventFilters';
import Fuse from 'fuse.js';
import { destructureData, fuzzySearchKeys, sortEvents } from './Utilities';
import { getTimeSortedEvents } from '../my-schedule/eventFunctions';
import Intersector from './Components/Intersector';
import ShareModal from './Presentational/ShareModal';

function App() {
	const [showShareModal, setShowShareModal] = useState(false);
	const [shareEventObject, setShareEventObject] = useState({
		title: '',
		link: '',
	});
	const [isVisible, setIsVisible] = useState(false);
	const [isLoading, setIsLoading] = useState(true);
	const [posts, setPosts] = useState<SortedEventsObject | PrettyEventData[]>(
		[]
	);
	const [filters, setFilters] = useState<EventFilters[]>([]);
	const [search, setSearch] = useState('');
	const [cursor, setCursor] = useState<string | undefined>(undefined);

	function doFirstSearch(data) {
		const { eventLocations, eventTypes, events } = data;
		setCursor(
			events.pageInfo.hasNextPage ? events.pageInfo.endCursor : undefined
		);
		const prettyEvents: PrettyEventData[] = events.nodes.map(
			(node: EventPost) => destructureData(node)
		);
		const sortedEvents = Object.values(
			getTimeSortedEvents(sortEvents(prettyEvents))
		).flat();
		setPosts(sortedEvents);
		setFilters([
			{
				type: {
					name: 'Event Types',
					filters: [...eventTypes.nodes],
				},
			},
			{
				type: {
					name: 'Locations',
					filters: [...eventLocations.nodes],
				},
			},
			{
				type: {
					name: 'Days',
					filters: [
						{ name: 'Friday', dayId: 1 },
						{ name: 'Saturday', dayId: 2 },
						{ name: 'Sunday', dayId: 3 },
					],
				},
			},
		]);
	}

	function handleSearchInput({ target }) {
		setSearch(target.value);
	}
	/** Handle Search Bar */
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

	/** Get More Posts on Scroll */
	useEffect(() => {
		if (cursor && isVisible) {
			Model.getPosts(cursor)
				.then((data) => {
					if (undefined === data) return;
					const { events } = data;
					if (events.pageInfo.hasNextPage) {
						setCursor(events.pageInfo.endCursor);
					} else {
						setCursor(undefined);
					}
					const prettyEvents: PrettyEventData[] = events.nodes.map(
						(node: EventPost) => destructureData(node)
					);
					const sortedEvents: SortedEventsObject =
						getTimeSortedEvents(sortEvents(prettyEvents));
					setPosts((prev) => {
						return [...prev, ...Object.values(sortedEvents).flat()];
					});
					setIsVisible(false);
				})
				.catch((err) => console.error(err));
		}
	}, [isVisible]);

	const [checkedFilters, setCheckedFilters] = useState<string[]>([]);
	return (
		<div className="cno-search">
			<SearchBar
				filters={filters}
				search={search}
				checkedFilters={checkedFilters}
				setCheckedFilters={setCheckedFilters}
				handleSearchInput={handleSearchInput}
			/>
			<div className="container">
				{!isLoading ? (
					<ResultsContainer
						posts={posts}
						checkedFilters={checkedFilters}
						setShowShareModal={setShowShareModal}
						setShareEventObject={setShareEventObject}
					/>
				) : (
					<LoadingSpinner />
				)}
			</div>
			<Intersector setIsVisible={setIsVisible} />
			{isVisible && cursor ? (
				<div className="container load-more-container">
					<LoadingSpinner />
				</div>
			) : (
				<div className="container load-more-container">
					End of Results.
				</div>
			)}
			<ShareModal
				showShareModal={showShareModal}
				setShowShareModal={setShowShareModal}
				shareEventObject={shareEventObject}
			/>
		</div>
	);
}
const root = document.getElementById('app');
if (root) createRoot(root).render(<App />);
