// Styles
import '../../styles/components/_hours-modal.scss';
import '../../styles/pages/schedule.scss';
import '../../styles/layouts/archive-events.scss';

// React + 3rd Parties
import React, { useState, useEffect, useReducer } from 'react';
import { createRoot } from 'react-dom/client';
import Fuse from 'fuse.js';

// Types
import { PrettyEventData } from './types';

// Components
import LoadingSpinner from '../spinner';
import ResultsContainer from './Presentational/Search Bar/ResultsContainer';
import ShareModal from './Presentational/ShareModal';
import SearchInput from './Presentational/Search Bar/SearchInput';
import SearchFiltersContainer from './Presentational/Search Bar/SearchFiltersContainer';
import SearchBarContainer from './Presentational/Search Bar/SearchBarContainer';

// Utilities
import { reducer, initialState } from './Utilities/reducer';
import { sortEvents, fuzzySearchKeys, getEvents } from './Utilities/Utilities';
import { getTimeSortedEvents } from '../my-schedule/eventFunctions';

function App() {
	const [ state, dispatch ] = useReducer( reducer, initialState );
	const {
		posts,
		isLoading,
		searchResults,
		showShareModal,
		shareEventObject,
		searchTerm,
		canGetPosts,
		filters,
		selectedFilters,
		showAll,
	} = state;

	const [ searchPosts, setSearchPosts ] = useState< PrettyEventData[] >( [] );
	/** First Render */
	useEffect( () => {
		dispatch( { type: 'isLoading', payload: true } );
		( async function () {
			const data = await getEvents();
			if ( ! data ) return;
			const sortedEvents: PrettyEventData[] = Object.values(
				getTimeSortedEvents( sortEvents( data ) )
			).flat();
			dispatch( { type: 'updatePosts', payload: sortedEvents } );
			dispatch( { type: 'setFilters', payload: data } );
		} )();
		dispatch( { type: 'isLoading', payload: false } );
		if ( window.AOS ) {
			window.AOS.refresh();
		}
	}, [] );

	/** Sets `searchPosts = posts` for Fuzzy Searching */
	useEffect( () => {
		setSearchPosts( Object.values( posts ).flat() );
	}, [ posts ] );

	/** Handle Search */
	useEffect( () => {
		const url = new URL( window.location.href );
		const searchParam = url.searchParams.get( 's' );
		if ( '' === searchParam && '' === searchTerm ) {
			dispatch( { type: 'resetSearch' } );
		} else {
			if ( searchPosts.length === 0 ) {
				return;
			}
			dispatch( { type: 'isLoading', payload: true } );
			const timeout = setTimeout( () => {
				const fuse = new Fuse( searchPosts, {
					...fuzzySearchKeys,
					minMatchCharLength: 3,
					includeScore: true,
					threshold: 0.3,
				} );
				const results = fuse.search( searchParam || searchTerm );
				dispatch( {
					type: 'setSearchResults',
					payload: results.map( ( result ) => result.item ),
				} );
				dispatch( { type: 'isLoading', payload: false } );
			}, 350 );
			return () => clearTimeout( timeout );
		}
	}, [ searchTerm, searchPosts, searchResults.length, posts ] );

	if ( false === canGetPosts ) {
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
					<SearchInput dispatch={ dispatch } search={ searchTerm } />
					<SearchFiltersContainer
						dispatch={ dispatch }
						selectedFilters={ selectedFilters }
						filters={ filters }
					/>
				</SearchBarContainer>
				<div className="container">
					{ isLoading && <LoadingSpinner /> }
					{ ! isLoading && searchResults.length > 0 && (
						<>
							<ResultsContainer
								dispatch={ dispatch }
								posts={ searchResults }
								isSearch={ true }
								selectedFilters={ selectedFilters }
							/>
							<button
								className="btn btn-primary"
								onClick={ () => {
									dispatch( { type: 'resetSearch' } );
									window.scrollTo( {
										top: 0,
										behavior: 'auto',
									} );
								} }
							>
								Reset Search
							</button>
						</>
					) }
					{ ! isLoading &&
						searchResults.length === 0 &&
						searchTerm && (
							<>
								<p className="my-5">No events found.</p>
								<button
									className="btn btn-primary"
									onClick={ () => {
										dispatch( { type: 'resetSearch' } );
										window.scrollTo( {
											top: 0,
											behavior: 'auto',
										} );
									} }
								>
									Reset Search
								</button>
							</>
						) }
					{ ! isLoading && showAll && (
						<ResultsContainer
							dispatch={ dispatch }
							posts={ posts }
							selectedFilters={ selectedFilters }
						/>
					) }
					<ShareModal
						dispatch={ dispatch }
						showShareModal={ showShareModal }
						shareEventObject={ shareEventObject }
					/>
				</div>
			</div>
		);
}
const root = document.getElementById( 'app' );
if ( root ) createRoot( root ).render( <App /> );
