import '../../styles/pages/my-schedule.scss';
import React, { useState, useEffect, createRoot } from '@wordpress/element';
import EventsDisplay from './EventDisplay';
import { SortedEventsObject, LaborDayEvent } from '../types';
import LoadingSpinner from '../spinner';
import { getLocalStorageData, getTimeSortedEvents } from './eventFunctions';

function App() {
	const [ isLoading, setIsLoading ] = useState( true );
	const [ events, setEvents ] = useState< SortedEventsObject >( {
		friday: [],
		saturday: [],
		sunday: [],
	} );
	const emptyEvents =
		events.friday.length === 0 &&
		events.saturday.length === 0 &&
		events.sunday.length === 0;
	useEffect( () => {
		try {
			const sortedEvents = getLocalStorageData();
			setEvents( getTimeSortedEvents( sortedEvents ) );
		} catch ( err ) {
			console.error( err );
		}
		setIsLoading( false );
	}, [] );
	function removeEvent( id: number, day: string ) {
		setIsLoading( true );
		const daySelector: string = day.toLowerCase();
		const filteredEvents = events[ daySelector ].filter(
			( event: LaborDayEvent ) => {
				return event.id !== id;
			}
		);
		const updatedEvents = { ...events, [ daySelector ]: filteredEvents };
		setEvents( updatedEvents );
		setIsLoading( false );
	}
	useEffect( () => {
		localStorage.setItem( 'schedule', JSON.stringify( events ) );
	}, [ events ] );

	if ( isLoading ) {
		return <LoadingSpinner />;
	}
	if ( emptyEvents ) {
		return <p>Seems like you haven't added any events yet.</p>;
	}
	return (
		<div className="container">
			<EventsDisplay schedule={ events } removeEvent={ removeEvent } />
		</div>
	);
}
const root = document.getElementById( 'app' );
if ( root ) createRoot( root ).render( <App /> );
