// 3rd Party
import React from 'react';

// Components
import SearchFilters from './SearchFilters';

// Utilities
import { useShowFilters } from '../../Utilities/CustomHooks';
import { initialState } from '../../Utilities/reducer';

declare global {
	interface Window {
		operationalHours?: {
			showOperationalHours: 'true' | 'false';
		};
	}
}

export default function SearchFiltersContainer( {
	selectedFilters,
	filters,
	dispatch,
} ) {
	const canShowOperationalHours =
		'true' === window?.operationalHours?.showOperationalHours;
	const { showFilters, setShowFilters, windowWidth } = useShowFilters();
	return (
		<div className="cno-event-search__filters">
			<div className="cno-event-search__filters--header">
				<h3 className="cno-event-search__filters--title">Filters</h3>
				<button
					className="btn btn-secondary"
					onClick={ () => {
						setShowFilters( ! showFilters );
					} }
				>
					{ showFilters ? 'Hide Filters' : 'Show Filters' }
				</button>
				{ initialState.selectedFilters !== selectedFilters && (
					<button
						className="btn btn-outline-secondary"
						onClick={ () => {
							dispatch( { type: 'resetSelectedFilters' } );
						} }
					>
						Reset Filters
					</button>
				) }
				{ windowWidth > 767 && canShowOperationalHours && (
					<button
						className="btn btn-secondary"
						data-bs-toggle="modal"
						data-bs-target="#hoursModal"
					>
						View Services / Operations Hours
					</button>
				) }
			</div>
			{ showFilters && (
				<SearchFilters
					dispatch={ dispatch }
					filters={ filters }
					selectedFilters={ selectedFilters }
				/>
			) }
		</div>
	);
}
