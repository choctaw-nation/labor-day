import {
	EventType,
	EventLocation,
	EventFilters,
	selectedFilterObject,
} from './types/eventFilters';

/**
 * Set in the Global scope with PHP and the Wordpress `localize_script` method
 */
declare const cnoSiteData: { rootUrl: string };

export type EventInfo = {
	description: string;
	info: {
		day: string;
		endTime: string | null;
		startTime: string;
	};
};

/** The raw structure of an event post type */
export type RawEventPost = {
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
	seo: {
		archiveContent: string;
	};
};

/** The Formatted Event Post Type Data */
export interface PrettyEventData {
	locations?: EventLocation[];
	type: EventType[];
	eventId: number;
	link: string;
	title: string;
	excerpt: string | null;
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

export interface searchAppState {
	isLoading: boolean;
	showAll: boolean;
	posts: PrettyEventData[];
	searchResults: PrettyEventData[];
	filters: EventFilters[];
	selectedFilters: selectedFilterObject;
	searchTerm: string;
	showShareModal: boolean;
	shareEventObject: {
		title: string;
		link: string;
	};
	canGetPosts: boolean;
}
