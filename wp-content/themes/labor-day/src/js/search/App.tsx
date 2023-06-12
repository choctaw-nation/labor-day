// Styles
import '../../styles/components/_hours-modal.scss';
import '../../styles/pages/schedule.scss';

// React + 3rd Parties
import React, { useEffect, createRoot, useReducer } from '@wordpress/element';

// Types
import { searchAppState } from './types';

// Components
import LoadingSpinner from '../spinner';
import ResultsContainer from './Presentational/Search Bar/ResultsContainer';
import Intersector from './Components/Intersector';
import ShareModal from './Presentational/ShareModal';
import SearchInput from './Presentational/Search Bar/SearchInput';
import SearchFiltersContainer from './Presentational/Search Bar/SearchFiltersContainer';
import SearchBarContainer from './Presentational/Search Bar/SearchBarContainer';

// Utilities
import reducer from './Utilities/reducer';
import model from '../add-to-schedule/model';
import view from '../add-to-schedule/view';
import {
	useSearchPosts,
	useGetMorePosts,
} from './Utilities/CustomHooks/SearchHooks';

export const initialState: searchAppState = {
	posts: [],
	filters: [
		{
			type: {
				name: 'Event Types',
				filters: [],
			},
		},
		{
			type: {
				name: 'Locations',
				filters: [],
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
	],
	selectedFilters: {
		'Event Types': 'Select Option',
		Days: 'Select Option',
		Locations: 'Select Option',
	},
	search: '',
	cursor: 'cursor',
	showShareModal: false,
	shareEventObject: {
		title: '',
		link: '',
	},
	isVisible: false,
	canGetPosts: (() => {
		const now = new Date();
		const end = new Date('September 3, 2023');
		return now < end;
	})(),
};

function App() {
	const [state, dispatch] = useReducer(reducer, initialState);
	const {
		showShareModal,
		shareEventObject,
		search,
		isVisible,
		cursor,
		canGetPosts,
		filters,
		selectedFilters,
	} = state;

	const { isLoading, posts } = useSearchPosts(search, dispatch);
	// const morePosts = useGetMorePosts(cursor, isVisible, dispatch);

	/** Get More Posts on Scroll */
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
					const prettyEvents: PrettyEventData[] = events.nodes.map(
						(node: RawEventPost) => destructureData(node)
					);
					const sortedEvents: SortedEventsObject =
						getTimeSortedEvents(sortEvents(prettyEvents));
					setPosts((prev) => {
						return [...prev, ...Object.values(sortedEvents).flat()];
					});
					dispatch({ type: 'intersecting', payload: false });
				})
				.catch((err) => console.error(err));
		}
	}, [isVisible]);

	/** On First Render, show floating schedule button */
	useEffect(() => {
		const schedule = model.getSchedule();
		if (!schedule) return;
		if (Object.values(schedule).flat().length > 0) {
			view.showScheduleButton();
		}
	}, []);

	if (!canGetPosts) {
		return (
			<div className="container">
				<p>
					Next year's events will be posted here. Check back
					periodically for updates.
				</p>
			</div>
		);
	} else
		return (
			<div className="cno-search">
				<SearchBarContainer>
					<SearchInput dispatch={dispatch} search={search} />
					<SearchFiltersContainer
						dispatch={dispatch}
						selectedFilters={selectedFilters}
						filters={filters}
					/>
				</SearchBarContainer>
				<div className="container">
					{isLoading ? (
						<LoadingSpinner />
					) : (
						<ResultsContainer
							dispatch={dispatch}
							posts={posts}
							selectedFilters={selectedFilters}
						/>
					)}
				</div>
				<Intersector dispatch={dispatch} />
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
					dispatch={dispatch}
					showShareModal={showShareModal}
					shareEventObject={shareEventObject}
				/>
			</div>
		);
}
const root = document.getElementById('app');
if (root) createRoot(root).render(<App />);
