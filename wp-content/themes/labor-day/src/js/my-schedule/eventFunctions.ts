import type { SortedEventsObject, LaborDayEvent } from '../types';
import { setIsLoading, setEvents, events } from './App';
export function getLocalStorageData(): SortedEventsObject {
	const data = localStorage.getItem( 'schedule' );
	const jsonEvents: Array< LaborDayEvent > = data ? JSON.parse( data ) : [];
	const sortedEvents: SortedEventsObject = {
		friday: [],
		saturday: [],
		sunday: [],
	};
	const days: Array< string > = [ 'friday', 'saturday', 'sunday' ];
	days.forEach( ( day ) => {
		const dailyEvents = jsonEvents[ day ].filter( ( ev: LaborDayEvent ) => {
			return ev.day.toLowerCase() == day;
		} );
		dailyEvents.forEach( ( ev ) => sortedEvents[ day ].push( ev ) );
	} );
	return sortedEvents;
}

/** Orders the events of the day by time from morning to night.
 * @param {SortedEventsObject} sortedEvents the data to sort.
 * @returns {SortedEventsObject} the sorted events.
 */
export function getTimeSortedEvents(
	sortedEvents: SortedEventsObject
): SortedEventsObject {
	function eventSorter( a, b ) {
		return (
			new Date( '1970/01/01 ' + a.start_time ) -
			new Date( '1970/01/01 ' + b.start_time )
		);
	}
	for ( const day in sortedEvents ) {
		sortedEvents[ day ].sort( eventSorter );
	}
	return sortedEvents;
}
