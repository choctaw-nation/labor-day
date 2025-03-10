import Model from '../../add-to-schedule/model';
import View from '../../add-to-schedule/view';
import { model as SearchModel } from './Model';

import { ExcerptObject, PrettyEventData, SortedEventsObject } from './types';

declare const cnoSiteData: {
	rootUrl: string;
	postsPerPage: string;
};

export const { postsPerPage: POSTS_PER_PAGE, rootUrl } = cnoSiteData;

/**
 * Creates an excerpt from a string.
 * @param {string} str The string to create an excerpt from
 * @returns {ExcerptObject} The excerpt object
 */
export function createExcerpt( str: string ): ExcerptObject {
	if ( null === str ) return { excerpt: '', readMore: false };
	const excerpt = str.slice( 3, 247 );
	const remainingContent = str.substring( 248 );
	if ( remainingContent.length > 1 ) {
		return {
			excerpt: excerpt + '...',
			readMore: remainingContent.length > 1,
		};
	} else {
		return {
			excerpt: excerpt,
			readMore: remainingContent.length > 1,
		};
	}
}

/**
 * Sorts a flat array of events into an object with keys for each day.
 * @param {PrettyEventData[]} events The flat events array
 * @returns {SortedEventsObject} The sorted events
 */
export function sortEvents( events: PrettyEventData[] ): SortedEventsObject {
	const days: string[] = [ 'friday', 'saturday', 'sunday' ];
	const sortedEvents: SortedEventsObject = {
		friday: [],
		saturday: [],
		sunday: [],
	};
	days.forEach( ( day ) => {
		const dailyEvents = events.filter( ( ev: PrettyEventData ) => {
			return ev.info.day.toLowerCase() === day;
		} );
		dailyEvents.forEach( ( ev ) => sortedEvents[ day ].push( ev ) );
	} );
	return sortedEvents;
}

/** On First Render, show floating schedule button and get posts */
export async function getEvents( searchTerm: string | undefined = undefined ) {
	const model = new Model();
	const view = new View();
	const schedule = model.getSchedule();
	if ( Object.values( schedule ).flat().length > 0 ) {
		view.showScheduleButton();
	}
	try {
		const data = await SearchModel.makeRequest( searchTerm );
		if ( undefined === data ) return;
		return data;
	} catch ( err ) {
		console.error( err );
	}
}
