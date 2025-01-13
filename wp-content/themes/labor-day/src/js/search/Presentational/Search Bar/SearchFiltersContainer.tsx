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
		<div className="d-flex flex-column row-gap-2 mt-3">
			<div className="d-grid gap-3 d-md-flex flex-wrap">
				<h3 className="text-white m-0">Filters</h3>
				<button
					className="btn btn-secondary w-fit"
					onClick={ () => {
						setShowFilters( ! showFilters );
					} }
				>
					{ showFilters ? 'Hide Filters' : 'Show Filters' }
				</button>
				{ initialState.selectedFilters !== selectedFilters && (
					<button
						className="btn btn-outline-secondary w-fit"
						onClick={ () => {
							dispatch( { type: 'resetSelectedFilters' } );
						} }
					>
						Reset Filters
					</button>
				) }
				{ windowWidth > 767 && canShowOperationalHours && (
					<button
						className="btn btn-secondary w-fit"
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
