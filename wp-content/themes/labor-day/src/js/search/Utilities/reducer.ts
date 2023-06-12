// Types
import { searchAppState } from '../types';

// Utility
import { initialState } from '../App';

export default function reducer(
	state: searchAppState,
	action
): searchAppState | void {
	switch (action.type) {
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
