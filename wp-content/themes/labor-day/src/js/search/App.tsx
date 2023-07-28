// Styles
import '../../styles/components/_hours-modal.scss';
import '../../styles/pages/schedule.scss';

// React + 3rd Parties
import React, {
	useState,
	useEffect,
	useReducer,
	createRoot,
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
		posts,
		searchResults,
		showShareModal,
		shareEventObject,
		searchTerm,
		canGetPosts,
		filters,
		selectedFilters,
	} = state;
	const [isLoading, setIsLoading] = useState(false);
	const [showAll, setShowAll] = useState(false);
	const [searchPosts, setSearchPosts] = useState<PrettyEventData[]>([]);

	/** Abstract Searchable Array for Fuzzy Searching */
	useEffect(() => {
		setSearchPosts(Object.values(posts).flat());
	}, [posts]);

	/** First Render */
	useEffect(() => {
		(async function () {
			setIsLoading(true);
			const data = await handleFirstAppRender();
			const { events } = data!;
			const prettyEvents: PrettyEventData[] = events.nodes.map(
				(node: RawEventPost) => destructureData(node)
			);
			const sortedEvents: PrettyEventData[] = Object.values(
				getTimeSortedEvents(sortEvents(prettyEvents))
			).flat();
			dispatch({ type: 'updatePosts', payload: sortedEvents });
			dispatch({ type: 'setFilters', payload: data! });
			setIsLoading(false);
		})();
	}, []);

	/** Handle Search */
	useEffect(() => {
		if ('' === searchTerm) {
			setShowAll(true);
			if (searchResults.length !== 0) {
				dispatch({ type: 'resetSearch' });
			}
		} else {
			if (searchPosts.length === 0) return;
			setIsLoading(true);
			const timeout = setTimeout(() => {
				const fuse = new Fuse(searchPosts, {
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
				setIsLoading(false);
			}, 350);
			return () => clearTimeout(timeout);
		}
		if (searchResults.length > 0) setShowAll(false);
	}, [searchTerm, searchPosts, searchResults.length]);

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
										onClick={() => {
											dispatch({
												type: 'showAll',
												payload: !showAll,
											});
											dispatch({ type: 'resetSearch' });
											window.scrollTo({
												top: 0,
												behavior: 'auto',
											});
										}}
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
