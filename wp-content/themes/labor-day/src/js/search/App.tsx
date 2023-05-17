import '../../styles/components/_hours-modal.scss';
import React, { useState, useEffect, createRoot } from '@wordpress/element';
import LoadingSpinner from '../spinner';
import Model from './Model';
import SearchBar from './Components/SearchBar';
import ResultsContainer from './Presentational/ResultsContainer';
import { EventPost, PrettyEventData, SortedEventsObject } from './types';
import { EventFilters } from './types/eventFilters';
import Fuse from 'fuse.js';
import { Modal } from 'bootstrap';
import { destructureData, fuzzySearchKeys, sortEvents } from './Utilities';
import { getTimeSortedEvents } from '../my-schedule/eventFunctions';
import fadeIn from '../fadeOnScroll';

function App() {
	const [isLoading, setIsLoading] = useState(true);
	const [posts, setPosts] = useState<SortedEventsObject | PrettyEventData[]>({
		friday: [],
		saturday: [],
		sunday: [],
	});
	const [filters, setFilters] = useState<EventFilters[]>([]);
	const [search, setSearch] = useState('');
	const [cursor, setCursor] = useState(undefined);
	function doFirstSearch(data) {
		const { eventLocations, eventTypes, events } = data;
		setCursor(
			events.pageInfo.hasNextPage ? events.pageInfo.endCursor : undefined
		);
		const prettyEvents: PrettyEventData[] = events.nodes.map(
			(node: EventPost) => destructureData(node)
		);
		const sortedEvents = getTimeSortedEvents(sortEvents(prettyEvents));
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
	useEffect(() => {
		if ('' === search) {
			Model.getPosts()
				.then((data) => {
					if (undefined === data) return;
					doFirstSearch(data);
					setIsLoading(false);
				})
				.catch((err) => console.error(err));
		}
	}, []);
	function handleSearchInput({ target }) {
		setSearch(target.value);
	}
	useEffect(() => {
		if ('' === search) {
			setIsLoading(true);
			Model.getPosts().then((data) => {
				if (undefined === data) return;
				doFirstSearch(data);
				setIsLoading(false);
			});
		}
		setIsLoading(true);
		const timeout = setTimeout(() => {
			const searchOptions = {
				...fuzzySearchKeys,
				minMatchCharLength: 3,
				includeScore: true,
				threshold: 0.3,
			};
			const fuse = new Fuse(Object.values(posts).flat(), searchOptions);
			const results = fuse.search(search);
			setPosts(results.map((result) => result.item));
			setIsLoading(false);
		}, 350);
		return () => clearTimeout(timeout);
	}, [search]);
	const [checkedFilters, setCheckedFilters] = useState<string[]>([]);
	useEffect(() => {
		fadeIn('.fadeIn');
	}, []);
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
					/>
				) : (
					<LoadingSpinner />
				)}
			</div>
		</div>
	);
}
const root = document.getElementById('app');
if (root) createRoot(root).render(<App />);
