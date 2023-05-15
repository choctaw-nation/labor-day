import {
	EventPost,
	ExcerptObject,
	PrettyEventData,
	SortedEventsObject,
} from './types';
declare const cnoSiteData: {
	rootUrl: string;
	postsPerPage: string;
};
export const { postsPerPage: POSTS_PER_PAGE, rootUrl } = cnoSiteData;
export const graphQL = `${ rootUrl }/graphql`;

export const fuzzySearchKeys = {
	keys: [
		{ name: 'title', weight: 1 },
		{ name: 'event_info.description', weight: 0.5 },
		{ name: 'event_info.info.day', weight: 0.03 },
		{ name: 'type.name', weight: 0.8 },
		{ name: 'locations.name', weight: 0.8 },
	],
};
export function destructureData( data: EventPost ): PrettyEventData {
	const {
		eventLocations: { nodes: locations },
	} = data;
	const {
		eventTypes: { nodes: type },
	} = data;
	const { eventId, link, title } = data;
	const { event_info } = data;
	const destructuredData: PrettyEventData = {
		locations,
		type,
		eventId,
		link,
		title,
		event_info,
	};
	destructuredData.featuredImage = data.featuredImage
		? data.featuredImage.node
		: null;

	return destructuredData;
}

export function createExcerpt( str: string ): ExcerptObject {
	const index = str.indexOf( '</p>' );
	const remainingContent = str.substring( index + 4 );
	if ( remainingContent.length > 1 ) {
		return {
			excerpt: str.substring( 0, index ) + '...</p>',
			readMore: remainingContent.length > 1,
		};
	} else {
		return {
			excerpt: str.substring( 0, index + 4 ),
			readMore: remainingContent.length > 1,
		};
	}
}

export function sortEvents( events: PrettyEventData[] ): SortedEventsObject {
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
