import {
	RawEventPost,
	ExcerptObject,
	PrettyEventData,
	SortedEventsObject,
} from '../types';

declare const cnoSiteData: {
	rootUrl: string;
	postsPerPage: string;
};

export const { postsPerPage: POSTS_PER_PAGE, rootUrl } = cnoSiteData;
export const graphQL = `${rootUrl}/graphql`;

export const fuzzySearchKeys = {
	keys: [
		{ name: 'title', weight: 4 },
		{ name: 'event_info.description', weight: 2 },
		{ name: 'type.name', weight: 1 },
		{ name: 'locations.name', weight: 1 },
	],
};

export function destructureData(data: RawEventPost): PrettyEventData {
	const {
		eventLocations: { nodes: locations },
	} = data;
	const {
		eventTypes: { nodes: type },
	} = data;
	const { eventId, link, title } = data;
	const { event_info } = data;
	const {
		seo: { archiveContent: excerpt },
	} = data;
	const destructuredData: PrettyEventData = {
		locations,
		type,
		eventId,
		link,
		title,
		excerpt,
		event_info,
	};
	destructuredData.featuredImage = data.featuredImage
		? data.featuredImage.node
		: null;

	return destructuredData;
}

export function createExcerpt(str: string): ExcerptObject {
	if (null === str) return { excerpt: '', readMore: false };
	const index = str.slice(3, 247);
	const remainingContent = str.substring(248);
	if (remainingContent.length > 1) {
		return {
			excerpt: str.slice(3, 247) + '...',
			readMore: remainingContent.length > 1,
		};
	} else {
		return {
			excerpt: str.slice(3, 247),
			readMore: remainingContent.length > 1,
		};
	}
}

export function sortEvents(events: PrettyEventData[]): SortedEventsObject {
	const days: string[] = ['friday', 'saturday', 'sunday'];
	const sortedEvents: SortedEventsObject = {
		friday: [],
		saturday: [],
		sunday: [],
	};
	days.forEach((day) => {
		const dailyEvents = events.filter((ev: PrettyEventData) => {
			return ev.event_info.info.day.toLowerCase() == day;
		});
		dailyEvents.forEach((ev) => sortedEvents[day].push(ev));
	});
	return sortedEvents;
}
