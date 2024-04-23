// 3rd Party
import React from 'react';

// Types
import { PrettyEventData } from '../../types';
import { selectedFilterObject } from '../../types/eventFilters';

// Components
import SinglePost from '../Posts/SinglePost';
import { ReadMoreButton } from '../CNOButtons';
import { AddToScheduleButton } from '../../Components/AddToScheduleButton';

// Utilities
import { initialState } from '../../Utilities/reducer';

// The Component
export default function ResultsContainer( {
	posts,
	dispatch,
	selectedFilters,
	isSearch,
}: {
	isSearch?: true;
	posts: PrettyEventData[];
	selectedFilters: selectedFilterObject;
	dispatch: Function;
} ) {
	const emptyFilters = initialState.selectedFilters === selectedFilters;
	const classList = isSearch
		? 'cno-events cno-events__search-results'
		: 'cno-events';
	return (
		<section className={ classList }>
			{ posts.map( ( post ) => {
				if (
					emptyFilters ||
					postMatchesFilters( post, selectedFilters )
				) {
					return (
						<SinglePost
							data={ post }
							dispatch={ dispatch }
							key={ post.eventId }
						>
							<>
								<AddToScheduleButton eventId={ post.eventId } />
								{ post.description && (
									<ReadMoreButton link={ post.link } />
								) }
							</>
						</SinglePost>
					);
				}
				return null;
			} ) }
			<div className="load-more-container">End of Results.</div>
		</section>
	);
}

/**
 * Returns true if Post matches selected filters
 *
 * @param {PrettyEventData} post The post to check
 * @returns boolean
 */
function postMatchesFilters(
	post: PrettyEventData,
	selectedFilters: selectedFilterObject
): boolean {
	const filters = {
		Locations: post.locations,
		'Event Types': post.type,
		Days: post.info.day,
	};
	const hasLocation =
		filterIsEmpty( selectedFilters.Locations ) ||
		( filters.Locations &&
			filters.Locations.some(
				( location ) => selectedFilters.Locations === location.name
			) );
	const hasType =
		filterIsEmpty( selectedFilters[ 'Event Types' ] ) ||
		filters[ 'Event Types' ].some(
			( type ) => selectedFilters[ 'Event Types' ] === type.name
		);
	const hasDay =
		filterIsEmpty( selectedFilters.Days ) ||
		selectedFilters.Days === filters.Days;
	console.log( selectedFilters.Days, filters.Days );
	return hasLocation && hasType && hasDay;
}

/**
 * Returns true if filter is default "empty" value
 *
 * @param {string} filter the filter to check
 * @returns boolean
 */
function filterIsEmpty( filter: string ): boolean {
	return filter === initialState.selectedFilters[ filter ];
}
