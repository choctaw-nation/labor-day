import React from '@wordpress/element';
import { EventFilters, selectedFilterObject } from '../types/eventFilters';

export default function SearchFilters({
	filters,
	selectedFilters,
	setSelectedFilters,
}: {
	filters: EventFilters[];
	selectedFilters: selectedFilterObject;
	setSelectedFilters: Function;
}) {
	function handleDropdownItemClick(categoryName: string, filterName: string) {
		setSelectedFilters((prevSelectedFilters) => {
			const newFilters = {
				...prevSelectedFilters,
				[categoryName]: filterName,
			};
			return newFilters;
		});
	}
	return (
		<div className="cno-event-search-filters">
			{filters.map(({ type: { name, filters } }) => (
				<div className="cno-event-search-filters__container" key={name}>
					<h4 className="cno-event-search-filters__title">{name}</h4>
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
											handleDropdownItemClick(
												name,
												filter.name
											)
										}
									>
										{filter.name}
									</a>
								))}
							</div>
						</div>
					</div>
				</div>
			))}
		</div>
	);
}
