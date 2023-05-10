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
	useEffect( () => {
		const sortedEvents = getLocalStorageData();

		setEvents( getTimeSortedEvents( sortedEvents ) );
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

	const emptyEvents =
		events.friday.length === 0 &&
		events.saturday.length === 0 &&
		events.sunday.length === 0;
	if ( isLoading ) {
		return <LoadingSpinner />;
	}
	if ( emptyEvents ) {
		return <p>Seems like you haven't added any events yet.</p>;
	}
	return (
		<>
			{ events.friday.length > 0 && (
				<div className="my-schedule__container">
					<h2 className="my-schedule__day-label">Friday</h2>
					<EventsDisplay
						schedule={ events.friday }
						day={ 'Friday' }
						removeEvent={ removeEvent }
					/>
				</div>
			) }
			{ events.saturday.length > 0 && (
				<div className="my-schedule__container">
					<h2 className="my-schedule__day-label">Saturday</h2>
					<EventsDisplay
						schedule={ events.saturday }
						day={ 'Saturday' }
						removeEvent={ removeEvent }
					/>
				</div>
			) }
			{ events.sunday.length > 0 && (
				<div className="my-schedule__container">
					<h2 className="my-schedule__day-label">Sunday</h2>
					<EventsDisplay
						schedule={ events.sunday }
						day={ 'Sunday' }
						removeEvent={ removeEvent }
					/>
				</div>
			) }
		</>
	);
}
const root = document.getElementById( 'app' );
if ( root ) createRoot( root ).render( <App /> );
