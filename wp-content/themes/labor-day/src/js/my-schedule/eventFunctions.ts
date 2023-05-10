import type { SortedEventsObject, LaborDayEvent } from '../types';

function getEvents() {
	const data = localStorage.getItem( 'schedule' );
	if ( null === data ) {
		throw new Error( 'No events found in local storage!' );
	} else return data;
}
/** Gets events from localStorage
 * @returns {SortedEventsObject} the events, sorted.
 */
export function getLocalStorageData(): SortedEventsObject {
	try {
		const data = getEvents();
		const jsonEvents: Array< LaborDayEvent > = data
			? JSON.parse( data )
			: [];
		const sortedEvents: SortedEventsObject = {
			friday: [],
			saturday: [],
			sunday: [],
		};
		const days: Array< string > = [ 'friday', 'saturday', 'sunday' ];
		days.forEach( ( day ) => {
			const dailyEvents = jsonEvents[ day ].filter(
				( ev: LaborDayEvent ) => {
					return ev.day.toLowerCase() == day;
				}
			);
			dailyEvents.forEach( ( ev ) => sortedEvents[ day ].push( ev ) );
		} );
		return sortedEvents;
	} catch ( err ) {
		throw err;
	}
}

/** Orders the events of the day by time from morning to night.
 * @param {SortedEventsObject} sortedEvents the data to sort.
 * @returns {SortedEventsObject} the sorted events.
 */
export function getTimeSortedEvents(
	sortedEvents: SortedEventsObject
): SortedEventsObject {
	/** The sorting event
	 * @param {LaborDayEvent} a the first event
	 * @param {LaborDayEvent} b the event to compare it against.
	 */
	function eventSorter( a: LaborDayEvent, b: LaborDayEvent ): number {
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
