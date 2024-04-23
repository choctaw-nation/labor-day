// 3rd Party
import React from 'react';

// Components
import SearchFilters from './SearchFilters';

// Utilities
import { useShowFilters } from '../../Utilities/CustomHooks';
import { initialState } from '../../Utilities/reducer';

export default function SearchFiltersContainer( {
	selectedFilters,
	filters,
	dispatch,
} ) {
	const { showFilters, setShowFilters, windowWidth } = useShowFilters();
	return (
		<div className="cno-event-search__filters">
			<div className="cno-event-search__filters--header">
				<h3 className="cno-event-search__filters--title">Filters</h3>
				<button
					className="btn__fill--secondary"
					onClick={ () => {
						setShowFilters( ! showFilters );
					} }
				>
					{ showFilters ? 'Hide Filters' : 'Show Filters' }
				</button>
				{ initialState.selectedFilters !== selectedFilters && (
					<button
						className="btn__outline--secondary"
						onClick={ () => {
							dispatch( { type: 'resetSelectedFilters' } );
						} }
					>
						Reset Filters
					</button>
				) }
				{ windowWidth > 767 && (
					<button
						className="btn__fill--secondary"
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
