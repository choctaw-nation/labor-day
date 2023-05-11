import { PrettyEventData } from './search/types';

export interface SortedEventsObject {
	friday: Array< PrettyEventData >;
	saturday: Array< PrettyEventData >;
	sunday: Array< PrettyEventData >;
}
