import React from 'react';
import { EventFilters, selectedFilterObject } from '../../types/eventFilters';

const filterKeys = {
	'Event Types': 'event-types',
	Days: 'days',
	Locations: 'locations',
};

export default function SearchFilters( {
	filters,
	selectedFilters,
	dispatch,
}: {
	filters: EventFilters[];
	selectedFilters: selectedFilterObject;
	dispatch: Function;
} ) {
	return (
		<div className="cno-event-search-filters">
			{ filters.map( ( filter ) => (
				<SearchFilter
					filter={ filter }
					key={ filterKeys[ filter.type.name ] }
					dispatch={ dispatch }
					selectedFilters={ selectedFilters }
				/>
			) ) }
		</div>
	);
}

function SearchFilter( { filter, dispatch, selectedFilters } ) {
	const {
		type: { name, filters },
	} = filter;

	return (
		<div className="cno-event-search-filters__container">
			<div className="cno-event-search-filters__filter-container">
				<div className="dropdown">
					<button
						className="btn btn-outline-secondary dropdown-toggle"
						id={ `${ filterKeys[ name ] }-dropdown` }
						data-bs-toggle="dropdown"
						aria-haspopup="true"
						aria-expanded="false"
					>
						{ selectedFilters[ name ] }
					</button>
					<ul
						className="dropdown-menu"
						aria-labelledby={ `${ filterKeys[ name ] }-dropdown` }
					>
						{ filters.map( ( filter, i ) => {
							return (
								<li key={ i }>
									<button
										className="dropdown-item fs-6 w-100"
										onClick={ () =>
											dispatch( {
												type: 'selectFilter',
												payload: {
													[ name ]: filter.name,
												},
											} )
										}
									>
										{ filter.name }
									</button>
								</li>
							);
						} ) }
					</ul>
				</div>
			</div>
		</div>
	);
}
