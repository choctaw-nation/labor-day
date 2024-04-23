export interface EventDay {
	name: string;
	dayId: number;
}

export type EventFilters = {
	type: {
		name: string;
		filters: {
			name: string;
			slug: string;
		}[];
	};
};

export type selectedFilterObject = {
	'Event Types': string;
	Days: string;
	Locations: string;
};
