interface Filter {
	uri: string;
	name: string;
}

export interface EventType extends Filter {
	event_typeId: number;
}

export interface EventLocation extends Filter {
	event_locationId: number;
}
export interface EventDay {
	name: string;
	dayId: number;
}

export type EventFilter = EventType | EventLocation | EventDay;
export type EventFilters = {
	type: {
		name: string;
		filters: EventFilter[];
	};
};

export type selectedFilterObject = {
	'Event Types': string;
	Days: string;
	Locations: string;
};
