import React, { useState } from '@wordpress/element';

export default function SearchFilters({ filters, setCheckedFilters }) {
	const [selectedFilters, setSelectedFilters] = useState({});

	function handleDropdownItemClick(categoryName, filterName) {
		setSelectedFilters((prevSelectedFilters) => {
			const newFilters = {
				...prevSelectedFilters,
				[categoryName]: filterName,
			};
			setCheckedFilters(Object.values(newFilters));
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
								{selectedFilters[name]
									? selectedFilters[name]
									: 'Select an option'}
							</button>
							<div
								className="dropdown-menu"
								aria-labelledby={`${name}-dropdown`}
							>
								{filters.map((filter, i) => (
									<button
										key={i}
										onClick={() =>
											handleDropdownItemClick(
												name,
												filter.name
											)
										}
									>
										{filter.name}
									</button>
								))}
							</div>
						</div>
					</div>
				</div>
			))}
			<button
				className="btn__fill--secondary"
				onClick={() => {
					setCheckedFilters([]);
					setSelectedFilters({});
				}}
			>
				Reset Filters
			</button>
		</div>
	);
}
