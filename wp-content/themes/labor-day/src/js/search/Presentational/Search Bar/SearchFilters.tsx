import React from '@wordpress/element';
import { EventFilters, selectedFilterObject } from '../../types/eventFilters';

export default function SearchFilters({
	filters,
	selectedFilters,
	dispatch,
}: {
	filters: EventFilters[];
	selectedFilters: selectedFilterObject;
	dispatch: Function;
}) {
	return (
		<div className="cno-event-search-filters">
			{filters.map((filter) => (
				<SearchFilter
					filter={filter}
					key={filter.type.name}
					dispatch={dispatch}
					selectedFilters={selectedFilters}
				/>
			))}
		</div>
	);
}

function SearchFilter({ filter, dispatch, selectedFilters }) {
	const {
		type: { name, filters },
	} = filter;
	return (
		<div className="cno-event-search-filters__container">
			<div className="cno-event-search-filters__filter-container">
				<div className="dropdown">
					<button
						className="btn__outline--secondary dropdown-toggle"
						type="button"
						id={`${name}-dropdown`}
						data-bs-toggle="dropdown"
						aria-haspopup="true"
						aria-expanded="false"
					>
						{selectedFilters[name]}
					</button>
					<div
						className="dropdown-menu"
						aria-labelledby={`${name}-dropdown`}
					>
						{filters.map((filter, i) => (
							<a
								key={i}
								role="button"
								onClick={() =>
									dispatch({
										type: 'selectFilter',
										payload: {
											[name]: filter.name,
										},
									})
								}
							>
								{filter.name}
							</a>
						))}
					</div>
				</div>
			</div>
		</div>
	);
}
