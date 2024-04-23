import { WP_Term } from 'wp-types';

export interface EventDay {
	name: string;
	dayId: number;
}

export type EventFilters = {
	type: {
		name: string;
		filters: WP_Term[];
	};
};

export type selectedFilterObject = {
	'Event Types': string;
	Days: string;
	Locations: string;
};
