import React from '@wordpress/element';
import { EventFilter } from '../types/eventFilters';

export default function SearchFilters({
	filters,
	checkedFilters,
	setCheckedFilters,
}) {
	function handleClick({ target }) {
		if (!target.id) return;
		if (checkedFilters.includes(target.id)) {
			setCheckedFilters(
				checkedFilters.filter((f) => {
					return f !== target.id;
				})
			);
		} else setCheckedFilters((prev) => [...prev, target.id]);
	}
	return (
		<div className="cno-event-search-filters">
			{filters.map(({ type: { name, filters } }) => {
				return (
					<div
						className="cno-event-search-filters__container"
						onClick={(ev) => {
							handleClick(ev);
						}}
						key={name}
					>
						<h4 className="cno-event-search-filters__title">
							{name}
						</h4>
						<div className="cno-event-search-filters__filter-container">
							{filters.map((filter: EventFilter, i: number) => {
								return (
									<div
										className="cno-event-search-filters__filter"
										key={i}
									>
										<input
											type="checkbox"
											name={filter.name}
											id={filter.name}
											checked={checkedFilters.includes(
												filter.name
											)}
											onChange={() => {}}
										/>
										<label htmlFor={filter.name}>
											{filter.name}
										</label>
									</div>
								);
							})}
						</div>
					</div>
				);
			})}
		</div>
	);
}
