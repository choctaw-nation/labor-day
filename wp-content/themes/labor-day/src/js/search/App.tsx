// Styles
import '../../styles/components/_hours-modal.scss';
import '../../styles/pages/schedule.scss';

// React + 3rd Parties
import React, {
	useState,
	useEffect,
	createRoot,
	useReducer,
} from '@wordpress/element';
import Fuse from 'fuse.js';

// Types
import { PrettyEventData, RawEventPost } from './types';

// Components
import LoadingSpinner from '../spinner';
import ResultsContainer from './Presentational/Search Bar/ResultsContainer';
import ShareModal from './Presentational/ShareModal';
import SearchInput from './Presentational/Search Bar/SearchInput';
import SearchFiltersContainer from './Presentational/Search Bar/SearchFiltersContainer';
import SearchBarContainer from './Presentational/Search Bar/SearchBarContainer';

// Utilities
import { reducer, initialState } from './Utilities/reducer';
import {
	destructureData,
	sortEvents,
	fuzzySearchKeys,
	handleFirstAppRender,
} from './Utilities/Utilities';
import { getTimeSortedEvents } from '../my-schedule/eventFunctions';

function App() {
	const [state, dispatch] = useReducer(reducer, initialState);
	const {
		isLoading,
		posts,
		searchResults,
		showShareModal,
		shareEventObject,
		searchTerm,
		canGetPosts,
		filters,
		selectedFilters,
	} = state;

	/** First Render */
	useEffect(() => {
		dispatch({ type: 'isLoading', payload: true });
		handleFirstAppRender()
			.then((data) => {
				const { events } = data!;
				const prettyEvents: PrettyEventData[] = events.nodes.map(
					(node: RawEventPost) => destructureData(node)
				);
				const sortedEvents: PrettyEventData[] = Object.values(
					getTimeSortedEvents(sortEvents(prettyEvents))
				).flat();
				dispatch({ type: 'updatePosts', payload: sortedEvents });
				dispatch({ type: 'setFilters', payload: data! });
			})
			.finally(() => dispatch({ type: 'isLoading', payload: false }));
	}, []);

	/** Handle Search */
	useEffect(() => {
		if ('' === searchTerm) {
			dispatch({ type: 'isLoading', payload: true });
			dispatch({ type: 'resetSearch' });

			// Use setTimeout to mimic an asynchronous operation
			const timeout = setTimeout(() => {
				dispatch({ type: 'isLoading', payload: false });
			}, 0);

			return () => clearTimeout(timeout);
		} else {
			dispatch({ type: 'isLoading', payload: true });
			const timeout = setTimeout(() => {
				const fuse = new Fuse(Object.values(posts).flat(), {
					...fuzzySearchKeys,
					minMatchCharLength: 3,
					includeScore: true,
					threshold: 0.3,
				});
				const results = fuse.search(searchTerm);
				dispatch({
					type: 'setSearchResults',
					payload: results.map((result) => result.item),
				});
				dispatch({ type: 'isLoading', payload: false });
			}, 350);
			return () => clearTimeout(timeout);
		}
	}, [searchTerm, posts]);

	const [showAll, setShowAll] = useState(searchResults.length === 0);
	function toggleShowAll() {
		setShowAll(!showAll);
		dispatch({ type: 'resetSearch' });
		window.scrollTo({ top: 0, behavior: 'auto' });
	}
	useEffect(() => {
		if (searchResults.length > 0) setShowAll(false);
	}, [searchResults]);

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
					<SearchInput dispatch={dispatch} search={searchTerm} />
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
						<>
							{searchResults.length > 0 && (
								<>
									<ResultsContainer
										dispatch={dispatch}
										posts={searchResults}
										isSearch={true}
										selectedFilters={selectedFilters}
									/>
									<button
										className="btn__primary--fill"
										onClick={toggleShowAll}
									>
										Reset Search
									</button>
								</>
							)}
							{showAll && (
								<ResultsContainer
									dispatch={dispatch}
									posts={posts}
									selectedFilters={selectedFilters}
								/>
							)}
						</>
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
