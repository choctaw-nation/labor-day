// 3rd Party
import React from '@wordpress/element';

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
export default function ResultsContainer({
	posts,
	dispatch,
	selectedFilters,
	isSearch,
}: {
	isSearch?: true;
	posts: PrettyEventData[];
	selectedFilters: selectedFilterObject;
	dispatch: Function;
}) {
	const emptyFilters = initialState.selectedFilters === selectedFilters;
	const classList = isSearch
		? 'cno-events cno-events__search-results'
		: 'cno-events';
	return (
		<section className={classList}>
			{posts.map((post) => {
				if (emptyFilters || postMatchesFilters(post, selectedFilters)) {
					return (
						<SinglePost
							data={post}
							dispatch={dispatch}
							key={post.eventId}
						>
							<>
								<AddToScheduleButton eventId={post.eventId} />
								{post.event_info.description && (
									<ReadMoreButton link={post.link} />
								)}
							</>
						</SinglePost>
					);
				}
				return null;
			})}
		</section>
	);
}

/** Returns true if Post matches selected filters
 * @param {PrettyEventData} post The post to check
 * @returns boolean
 */
function postMatchesFilters(
	post: PrettyEventData,
	selectedFilters: selectedFilterObject
): boolean {
	const postInFilters: boolean =
		(filterIsEmpty(selectedFilters.Locations) ||
			post.locations?.some(
				(location) => selectedFilters.Locations === location.name
			)) &&
		(filterIsEmpty(selectedFilters['Event Types']) ||
			post.type?.some(
				(type) => selectedFilters['Event Types'] === type.name
			)) &&
		(filterIsEmpty(selectedFilters.Days) ||
			selectedFilters.Days === post.event_info.info.day);
	return postInFilters;
}
/** Returns true if filter is default "empty" value
 * @param {string} filter the filter to check
 * @returns boolean
 */
function filterIsEmpty(filter: string): boolean {
	return filter === initialState.selectedFilters[filter];
}
