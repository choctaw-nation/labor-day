// 3rd Party
import React, { useState, useEffect } from 'react';
import { createRoot } from 'react-dom/client';

// Types
import { SortedEventsObject, PrettyEventData } from '../search/types';

// Components
import EventsDisplay from './EventDisplay';
import LoadingSpinner from '../spinner';

// Utilities
import { getLocalStorageData, getTimeSortedEvents } from './eventFunctions';

const emptyEventsState: SortedEventsObject = {
	friday: [],
	saturday: [],
	sunday: [],
};

function App() {
	const [ isLoading, setIsLoading ] = useState( true );
	const [ events, setEvents ] =
		useState< SortedEventsObject >( emptyEventsState );

	const emptyEvents =
		events.friday.length === 0 &&
		events.saturday.length === 0 &&
		events.sunday.length === 0;

	useEffect( () => {
		try {
			const sortedEvents = getLocalStorageData();
			setEvents( getTimeSortedEvents( sortedEvents ) );
		} catch ( err ) {
			// console.error( err );
			// TODO: handle this better
			setEvents( emptyEventsState );
			return;
		} finally {
			setIsLoading( false );
		}
	}, [] );

	function removeEvent( id: number, day: string ) {
		setIsLoading( true );
		const daySelector: string = day.toLowerCase();
		const filteredEvents = events[ daySelector ].filter(
			( event: PrettyEventData ) => {
				return event.eventId !== id;
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
		return (
			<div className="container">
				<LoadingSpinner />
			</div>
		);
	}
	if ( emptyEvents ) {
		return (
			<div className="container">
				<div className="row">
					<div className="col">
						<p className="fs-6">
							Seems like you haven't added any events yet.
						</p>
					</div>
				</div>
			</div>
		);
	}
	return (
		<div className="container cno-events">
			<EventsDisplay schedule={ events } removeEvent={ removeEvent } />
		</div>
	);
}
const root = document.getElementById( 'app' );
if ( root ) createRoot( root ).render( <App /> );
