import { WP_Term } from 'wp-types';

/**
 * Set in the Global scope with PHP and the Wordpress `localize_script` method
 */
declare const cnoSiteData: { rootUrl: string };

export type EventInfo = {
	day: 'Friday' | 'Saturday' | 'Sunday';
	end_time: string | null;
	start_time: string;
};

/** The Formatted Event Post Type Data */
export interface PrettyEventData {
	eventId: number;
	link: string;
	title: string;
	description: string;
	brief_description: string;
	info: EventInfo;
	featured_image?: FeaturedImage | null;
	locations?: WP_Term[];
	type: WP_Term[];
}

export type FeaturedImage = {
	altText: string;
	srcset: string;
	src: string;
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
