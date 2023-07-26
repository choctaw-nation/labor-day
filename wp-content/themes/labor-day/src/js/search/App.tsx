// Styles
import '../../styles/components/_hours-modal.scss';
import '../../styles/pages/schedule.scss';

// React + 3rd Parties
import React, {
	useEffect,
	createRoot,
	useReducer,
	useState,
} from '@wordpress/element';
import Fuse from 'fuse.js';

// Types
import { PrettyEventData, RawEventPost } from './types';

// Components
import LoadingSpinner from '../spinner';
import ResultsContainer from './Presentational/Search Bar/ResultsContainer';
// import Intersector from './Components/Intersector';
import ShareModal from './Presentational/ShareModal';
import SearchInput from './Presentational/Search Bar/SearchInput';
import SearchFiltersContainer from './Presentational/Search Bar/SearchFiltersContainer';
import SearchBarContainer from './Presentational/Search Bar/SearchBarContainer';

// Utilities
import { reducer, initialState } from './Utilities/reducer';
import model from '../add-to-schedule/model';
import view from '../add-to-schedule/view';
import Model from './Model';
import {
	destructureData,
	sortEvents,
	fuzzySearchKeys,
} from './Utilities/Utilities';
import { getTimeSortedEvents } from '../my-schedule/eventFunctions';
// import { useSearchPosts } from './Utilities/CustomHooks/SearchHooks';

function App() {
	const [isLoading, setIsLoading] = useState(false);
	const [state, dispatch] = useReducer(reducer, initialState);
	const {
		posts,
		showShareModal,
		shareEventObject,
		search,
		canGetPosts,
		filters,
		selectedFilters,
	} = state;

	// function doFirstSearch(data) {
	// 	const { events } = data;
	// 	const prettyEvents: PrettyEventData[] = events.nodes.map(
	// 		(node: RawEventPost) => destructureData(node)
	// 	);
	// 	const sortedEvents: PrettyEventData[] = Object.values(
	// 		getTimeSortedEvents(sortEvents(prettyEvents))
	// 	).flat();
	// 	dispatch({ type: 'updatePosts', payload: sortedEvents });
	// }

	/** Handle Search */
	useEffect(() => {
		setIsLoading(true);
		if ('' === search) {
			dispatch({ type: 'getPosts' });
			console.log(posts);
			setIsLoading(false);
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
				dispatch({
					type: 'setPosts',
					payload: results.map((result) => result.item),
				});
				setIsLoading(false);
			}, 350);
			return () => clearTimeout(timeout);
		}
	}, [search, posts]);

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
				<div className="container load-more-container">
					End of Results.
				</div>
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
