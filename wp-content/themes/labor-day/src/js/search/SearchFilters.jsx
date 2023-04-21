import React from '@wordpress/element';
export default function SearchFilters({
	filters,
	checkedFilters,
	setCheckedFilters,
}) {
	return (
		<div className="cno-event-search-filters">
			{filters.map(({ type, slug, name }) => {
				<div className="cno-event-sesarch-filters__container">
					<h4 className="cno-event-search-filters__title">{type}</h4>
					<div className="cno-event-search-filters__filter">
						<input type="checkbox" name={slug} id={slug} />
						<label htmlFor={slug}>{name}</label>
					</div>
				</div>;
			})}
		</div>
	);
}
