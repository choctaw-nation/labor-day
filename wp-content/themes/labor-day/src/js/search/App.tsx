import '../../styles/components/_hours-modal.scss';
import '../../styles/pages/schedule.scss';
import React, {
	StrictMode,
	useState,
	useEffect,
	createRoot,
} from '@wordpress/element';
import LoadingSpinner from '../spinner';
import Model from './Model';
import SearchBar from './Components/SearchBar';
import ResultsContainer from './Presentational/ResultsContainer';
import { RawEventPost, PrettyEventData, SortedEventsObject } from './types';
import { EventFilters } from './types/eventFilters';
import Fuse from 'fuse.js';
import { destructureData, fuzzySearchKeys, sortEvents } from './Utilities';
import {
	getLocalStorageData,
	getTimeSortedEvents,
} from '../my-schedule/eventFunctions';
import Intersector from './Components/Intersector';
import ShareModal from './Presentational/ShareModal';

function App() {
	const [showShareModal, setShowShareModal] = useState(false);
	const [shareEventObject, setShareEventObject] = useState({
		title: '',
		link: '',
	});
	function triggerModal(title: string, link: string) {
		setShowShareModal(true);
		setShareEventObject({
			title: title,
			link: link,
		});
	}
	const [isVisible, setIsVisible] = useState(false);
	const [isLoading, setIsLoading] = useState(true);
	const [posts, setPosts] = useState<PrettyEventData[]>([]);
	const [filters, setFilters] = useState<EventFilters[]>([]);
	const [selectedFilters, setSelectedFilters] = useState({
		'Event Types': 'Select Option',
		Days: 'Select Option',
		Locations: 'Select Option',
	});
	const [mySchedule, setMySchedule] = useState(getLocalStorageData);
	const [search, setSearch] = useState('');
	function handleSearchInput({ target }) {
		setSearch(target.value);
	}
	const [cursor, setCursor] = useState<string | undefined>('cursor');

	function doFirstSearch(data) {
		const { eventLocations, eventTypes, events } = data;
		setCursor(
			events.pageInfo.hasNextPage ? events.pageInfo.endCursor : undefined
		);
		const prettyEvents: PrettyEventData[] = events.nodes.map(
			(node: RawEventPost) => destructureData(node)
		);
		const sortedEvents: PrettyEventData[] = Object.values(
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

	/** Handle Local Storage Data */
	useEffect(() => {
		console.log(mySchedule);
	}, [mySchedule]);
	return (
		<div className="cno-search">
			<SearchBar
				filters={filters}
				search={search}
				selectedFilters={selectedFilters}
				setSelectedFilters={setSelectedFilters}
				handleSearchInput={handleSearchInput}
			/>
			<div className="container">
				{!isLoading ? (
					<ResultsContainer
						posts={posts}
						triggerModal={triggerModal}
						selectedFilters={selectedFilters}
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
if (root)
	createRoot(root).render(
		<StrictMode>
			<App />
		</StrictMode>
	);
