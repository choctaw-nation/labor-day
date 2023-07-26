import { PrettyEventData } from '../types';
import { EventLocation, EventType } from '../types/eventFilters';

type IsLoadingAction = {
	type: 'isLoading';
	payload: boolean;
};

type UpdatePostsAction = {
	type: 'updatePosts';
	payload: PrettyEventData[];
};

type ResetSelectedFiltersAction = {
	type: 'resetSelectedFilters';
};

type SelectFilterAction = {
	type: 'selectFilter';
	payload: {
		[key: string]: any;
	};
};

type SetFiltersAction = {
	type: 'setFilters';
	payload: {
		eventTypes: { nodes: EventType[] };
		eventLocations: { nodes: EventLocation[] };
	};
};

type TriggerModalAction = {
	type: 'triggerModal';
	payload: any;
};

type CloseModalAction = {
	type: 'closeModal';
};

type DoSearchAction = {
	type: 'doSearch';
	payload: string;
};

type SetSearchResultsAction = {
	type: 'setSearchResults';
	payload: any;
};

type ResetSearchAction = {
	type: 'resetSearch';
};

export type AppActions =
	| IsLoadingAction
	| UpdatePostsAction
	| ResetSelectedFiltersAction
	| SelectFilterAction
	| SetFiltersAction
	| TriggerModalAction
	| CloseModalAction
	| DoSearchAction
	| SetSearchResultsAction
	| ResetSearchAction;
