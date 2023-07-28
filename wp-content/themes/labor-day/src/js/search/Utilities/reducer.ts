// Types
import { PrettyEventData, searchAppState } from '../types';
import { AppActions } from './AppActions';
import TimeHandler from './TimeHandler';

const timeHandler = new TimeHandler();
export const initialState: searchAppState = {
	posts: [],
	isLoading: false,
	searchResults: [],
	showAll: true,
	filters: [
		{
			type: {
				name: 'Event Types',
				filters: [],
			},
		},
		{
			type: {
				name: 'Locations',
				filters: [],
			},
		},
		{
			type: {
				name: 'Days',
				filters: [
					{ name: 'Friday', dayId: 1 },
					{ name: 'Saturday', dayId: 2 },
					{ name: 'Sunday', dayId: 3 },
				],
			},
		},
	],
	selectedFilters: {
		'Event Types': 'Event Types',
		Days: 'Days',
		Locations: 'Locations',
	},
	searchTerm: '',
	showShareModal: false,
	shareEventObject: {
		title: '',
		link: '',
	},
	canGetPosts: (() => {
		const now = new Date();
		const end = new Date('September 3, 2023');
		return now < end;
	})(),
};

export function reducer(
	state: searchAppState,
	action: AppActions
): searchAppState {
	const now = new Date();
	switch (action.type) {
		case 'updatePosts':
			const dateFilteredPosts = action.payload.filter(
				(event: PrettyEventData) =>
					timeHandler.createDateString(event.event_info.info) > now
			);
			return state.posts.length > 0
				? {
						...state,
						posts: [...state.posts, ...dateFilteredPosts],
				  }
				: {
						...state,
						posts: dateFilteredPosts,
				  };
		case 'resetSelectedFilters':
			return {
				...state,
				selectedFilters: initialState.selectedFilters,
			};
		case 'selectFilter':
			return {
				...state,
				selectedFilters: {
					...state.selectedFilters,
					...action.payload,
				},
			};
		case 'setFilters':
			const { eventTypes, eventLocations } = action.payload;
			const filtersArr = [
				{
					type: {
						name: 'Event Types',
						filters: [...eventTypes.nodes],
					},
				},
				{
					type: {
						name: 'Locations',
						filters: [...eventLocations.nodes],
					},
				},
				{
					type: {
						name: 'Days',
						filters: [
							{ name: 'Friday', dayId: 1 },
							{ name: 'Saturday', dayId: 2 },
							{ name: 'Sunday', dayId: 3 },
						],
					},
				},
			];
			return {
				...state,
				filters: filtersArr,
			};
		case 'triggerModal':
			return {
				...state,
				showShareModal: true,
				shareEventObject: action.payload,
			};
		case 'closeModal':
			return {
				...state,
				showShareModal: false,
				shareEventObject: initialState.shareEventObject,
			};
		case 'doSearch':
			return {
				...state,
				searchTerm: action.payload,
			};
		case 'setSearchResults':
			return {
				...state,
				searchResults: action.payload,
			};
		case 'resetSearch':
			return { ...state, searchResults: [], searchTerm: '' };
		default:
			throw new Error(`Unknown action type! ${action.type}`);
	}
}
