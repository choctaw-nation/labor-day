import { EventType, EventLocation } from './types/eventFilters';
type EventInfo = {
	description: string;
	info: {
		day: string;
		endTime?: string;
		startTime: string;
	};
};
/** The raw structure of an event post type */
export type EventPost = {
	eventLocations: {
		nodes: EventLocation[];
	};
	event_info: EventInfo;
	featuredImage: {
		node: {
			altText: string;
			mediaDetails: {
				sizes: [
					{
						height: string;
						name: string;
						width: string;
						sourceUrl: string;
					}
				];
			};
			srcSet: string;
			sizes: string;
		};
	};
	title: string;
	link: string;
	eventId: number;
	eventTypes: {
		nodes: EventType[];
	};
};
/** The Formatted Event Post Type Data */
export interface PrettyEventData {
	locations?: EventLocation[];
	type: EventType[];
	eventId: number;
	link: string;
	title: string;
	event_info: EventInfo;
	featuredImage?: featuredImage | null;
}
export type featuredImage = {
	altText: string;
	srcSet: string;
	mediaDetails: {
		sizes: sizes[];
	};
	sizes: string;
};
type sizes = {
	height: string;
	width: string;
	sourceUrl: string;
};

export type ExcerptObject = {
	excerpt: string;
	readMore: boolean;
};

export interface SortedEventsObject {
	friday: PrettyEventData[];
	saturday: PrettyEventData[];
	sunday: PrettyEventData[];
}
