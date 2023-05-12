import React, { useState, useEffect, createRoot } from '@wordpress/element';
import LoadingSpinner from '../spinner';
import Model from './Model';
import SearchBar from './Components/SearchBar';
import ResultsContainer from './Presentational/ResultsContainer';
import { EventFilters, EventPost, PrettyEventData } from './types';
import Fuse from 'fuse.js';
import { destructureData, fuzzySearchKeys } from './Utilities';
import { Modal } from 'bootstrap';
import { SortedEventsObject } from '../types';
import { getTimeSortedEvents } from '../my-schedule/eventFunctions';
import fadeIn from '../fadeOnScroll';
function sortEvents( events: PrettyEventData[] ): SortedEventsObject {
	const days: string[] = [ 'friday', 'saturday', 'sunday' ];
	const sortedEvents: SortedEventsObject = {
		friday: [],
		saturday: [],
		sunday: [],
	};
	days.forEach( ( day ) => {
		const dailyEvents = events.filter( ( ev: PrettyEventData ) => {
			return ev.event_info.info.day.toLowerCase() == day;
		} );
		dailyEvents.forEach( ( ev ) => sortedEvents[ day ].push( ev ) );
	} );
	return sortedEvents;
}
function App() {
	const [ isLoading, setIsLoading ] = useState( true );
	const [ posts, setPosts ] = useState< SortedEventsObject >( {
		friday: [],
		saturday: [],
		sunday: [],
	} );
	const [ filters, setFilters ] = useState< EventFilters[] >( [] );
	const [ search, setSearch ] = useState( '' );
	useEffect( () => {
		if ( '' === search ) {
			const data = Model.getPosts()
				.then( ( data ) => {
					const { eventLocations, eventTypes, events } = data;
					const prettyEvents: PrettyEventData[] = events.nodes.map(
						( node ) => destructureData( node )
					);
					const sortedEvents = getTimeSortedEvents(
						sortEvents( prettyEvents )
					);
					setPosts( sortedEvents );
					const filtersArr: EventFilters[] = [
						{
							type: {
								name: 'Event Types',
								filters: [ ...eventTypes.nodes ],
							},
						},
						{
							type: {
								name: 'Locations',
								filters: [ ...eventLocations.nodes ],
							},
						},
					];
					setFilters( filtersArr );
					setIsLoading( false );
				} )
				.catch( ( err ) => console.error( err ) );
		}
	}, [ search ] );

	function handleSearchInput( { target } ) {
		setSearch( target.value );
	}
	useEffect( () => {
		if ( '' === search ) return;
		setIsLoading( true );
		const timeout = setTimeout( () => {
			const fuse = new Fuse( posts, {
				...fuzzySearchKeys,
			} );
			const results = fuse.search( search );
			setPosts( results.map( ( result ) => result.item ) );
			setIsLoading( false );
		}, 500 );
		return () => clearTimeout( timeout );
	}, [ search ] );
	const [ checkedFilters, setCheckedFilters ] = useState< string[] >( [] );
	useEffect( () => {
		fadeIn( '.fadeIn' );
	}, [] );
	return (
		<div className="cno-search">
			<SearchBar
				filters={ filters }
				search={ search }
				checkedFilters={ checkedFilters }
				setCheckedFilters={ setCheckedFilters }
				handleSearchInput={ handleSearchInput }
			/>
			<div className="container">
				{ ! isLoading ? (
					<ResultsContainer
						posts={ posts }
						checkedFilters={ checkedFilters }
					/>
				) : (
					<LoadingSpinner />
				) }
			</div>
		</div>
	);
}
const root = document.getElementById( 'app' );
if ( root ) createRoot( root ).render( <App /> );
