import { EventPost } from '../types';
import { EventLocation, EventType } from './eventFilters';

export type makeRequestResponse = {
	events: {
		pageInfo: {
			hasNextPage: boolean;
			endCursor: string;
		};
		nodes: EventPost[];
	};
	eventTypes: {
		nodes: EventType[];
	};
	eventLocations: {
		nodes: EventLocation[];
	};
};

export type queryVars = {
	first: number;
	after?: string;
};
