import { WP_Term } from 'wp-types';
import { PrettyEventData } from '../types';

type ShowAllAction = {
	type: 'showAll';
	payload: boolean;
};

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
		[ key: string ]: any;
	};
};

type SetFiltersAction = {
	type: 'setFilters';
	payload: {
		types: WP_Term[];
		locations: WP_Term[];
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
	| ShowAllAction
	| UpdatePostsAction
	| ResetSelectedFiltersAction
	| SelectFilterAction
	| SetFiltersAction
	| TriggerModalAction
	| CloseModalAction
	| DoSearchAction
	| SetSearchResultsAction
	| ResetSearchAction;
