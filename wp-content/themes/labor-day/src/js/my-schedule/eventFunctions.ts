import { PrettyEventData } from '../search/types';
import type { SortedEventsObject } from '../search/types';

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
		const jsonEvents: PrettyEventData[] = data ? JSON.parse( data ) : [];
		const sortedEvents: SortedEventsObject = {
			friday: [],
			saturday: [],
			sunday: [],
		};
		if ( Object.values( jsonEvents ).flat().length === 0 ) {
			throw new Error( 'No events found in local storage!' );
		}
		const days: string[] = [ 'friday', 'saturday', 'sunday' ];
		days.forEach( ( day ) => {
			const dailyEvents = jsonEvents[ day ].filter(
				( ev: PrettyEventData ) => {
					return ev.info.day.toLowerCase() == day;
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
 *
 * @param {SortedEventsObject} sortedEvents the data to sort.
 * @returns {SortedEventsObject} the sorted events.
 */
export function getTimeSortedEvents(
	sortedEvents: SortedEventsObject
): SortedEventsObject {
	for ( const day in sortedEvents ) {
		sortedEvents[ day ].sort(
			( a: PrettyEventData, b: PrettyEventData ): number =>
				new Date( '1970/01/01 ' + a.info.startTime ) -
				new Date( '1970/01/01 ' + b.info.startTime )
		);
	}
	return sortedEvents;
}
