import React, { useState } from '@wordpress/element';
import SearchFilters from './SearchFilters';
export default function SearchBar({
	filters,
	setFilters,
	checkedFilters,
	setCheckedFilters,
}) {
	const [showFilters, setShowFilters] = useState(false);
	return (
		<section className="cno-event-search">
			<div className="container">
				<h2 className="cno-event-search__title">Search Events</h2>
				<input
					type="text"
					name="search"
					id="search"
					placeholder="Find an Event"
				/>
				<div className="cno-event-search__filters">
					<div className="cno-event-search__filters--header">
						<h3 className="cno-event-search__filters--title">
							Filters
						</h3>
						<button
							className="btn__outline--secondary"
							onClick={() => {
								setShowFilters(!showFilters);
							}}>
							{showFilters ? 'Hide Filters' : 'Show Filters'}
						</button>
					</div>
					{showFilters && (
						<SearchFilters
							filters={filters}
							checkedFilters={checkedFilters}
							setCheckedFilters={setCheckedFilters}
						/>
					)}
				</div>
			</div>
		</section>
	);
}
