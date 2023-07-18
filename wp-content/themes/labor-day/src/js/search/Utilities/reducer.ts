// Types
import { PrettyEventData, searchAppState } from '../types';
import TimeHandler from './TimeHandler';

const timeHandler = new TimeHandler();
export const initialState: searchAppState = {
	posts: [],
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
	search: '',
	cursor: 'cursor',
	showShareModal: false,
	shareEventObject: {
		title: '',
		link: '',
	},
	isVisible: false,
	canGetPosts: (() => {
		const now = new Date();
		const end = new Date('September 3, 2023');
		return now < end;
	})(),
};

export function reducer(state: searchAppState, action): searchAppState | void {
	switch (action.type) {
		case 'setPosts':
			return {
				...state,
				posts: action.payload,
			};
		case 'updatePosts':
			const now = new Date();
			const dateFilteredPosts = action.payload.filter(
				(event: PrettyEventData) =>
					timeHandler.createDateString(event.event_info.info) > now
			);
			return {
				...state,
				posts: [...state.posts, ...dateFilteredPosts],
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
				search: action.payload,
			};
		case 'intersecting':
			return {
				...state,
				isVisible: action.payload,
			};
		case 'updateCursor':
			return {
				...state,
				cursor: action.payload,
			};
		default:
			throw new Error(`Unknown action type! ${action.type}`);
	}
}
