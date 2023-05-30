import React, { useState, useEffect } from '@wordpress/element';
import SearchFilters from '../Presentational/SearchFilters';
import SearchInput from '../Presentational/SearchInput';

export default function SearchBar({
	filters,
	handleSearchInput,
	search,
	selectedFilters,
	setSelectedFilters,
}) {
	const [showFilters, setShowFilters] = useState(false);
	useEffect(() => {
		if (window.innerWidth > 767) {
			setShowFilters(true);
		}
	}, []);
	console.log(showFilters);
	return (
		<section className="cno-event-search">
			<div className="container">
				<h2 className="cno-event-search__title">Search Events</h2>
				<SearchInput
					search={search}
					handleSearchInput={handleSearchInput}
				/>
				<div className="cno-event-search__filters">
					<div className="cno-event-search__filters--header">
						<h3 className="cno-event-search__filters--title">
							Filters
						</h3>
						<button
							className={
								showFilters
									? 'btn__outline--secondary'
									: 'btn__fill--secondary'
							}
							onClick={() => {
								setShowFilters(!showFilters);
							}}
						>
							{showFilters ? 'Hide Filters' : 'Show Filters'}
						</button>
						{Object.values(selectedFilters).some(
							(filter) => 'Select Option' !== filter
						) && (
							<button
								className="btn__fill--secondary"
								onClick={() => {
									setSelectedFilters({
										'Event Types': 'Select Option',
										Days: 'Select Option',
										Locations: 'Select Option',
									});
								}}
							>
								Reset Filters
							</button>
						)}
						<button
							class="btn__fill--secondary"
							data-bs-toggle="modal"
							data-bs-target="#hoursModal"
						>
							View Services / Operations Hours
						</button>
					</div>
					{showFilters && (
						<SearchFilters
							filters={filters}
							selectedFilters={selectedFilters}
							setSelectedFilters={setSelectedFilters}
						/>
					)}
				</div>
			</div>
		</section>
	);
}
