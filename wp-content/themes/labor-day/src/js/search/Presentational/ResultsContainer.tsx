import React from '@wordpress/element';
import SinglePost from './SinglePost';
import { PrettyEventData } from '../types';
import { SortedEventsObject } from '../../search/types';
import { ReadMoreButton } from './CNOButtons';
import { AddToScheduleButton } from '../Components/AddToScheduleButton';
import { createExcerpt } from '../Utilities';
import { selectedFilterObject } from '../types/eventFilters';

export default function ResultsContainer({
	posts,
	selectedFilters,
	triggerModal,
}: {
	posts: SortedEventsObject | PrettyEventData[];
	selectedFilters: selectedFilterObject;
	triggerModal: Function;
}) {
	let merged: PrettyEventData[] = [];
	if (!Array.isArray(posts)) {
		merged = Object.values(posts).flat();
	} else merged = posts;
	const emptyFilters = Object.values(selectedFilters).every(
		(filter) => 'Select Option' === filter
	);

	/** Returns true if Post matches selected filters
	 * @param {PrettyEventData} post The post to check
	 * @returns boolean
	 */
	function postMatchesFilters(post: PrettyEventData): boolean {
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
		return filter === 'Select Option';
	}
	return (
		<section className="cno-events">
			{merged.map((post: PrettyEventData) => {
				if (emptyFilters || postMatchesFilters(post)) {
					return (
						<SinglePost
							data={post}
							triggerModal={triggerModal}
							key={post.eventId}
						>
							<>
								<AddToScheduleButton eventId={post.eventId} />
								{createExcerpt(post.event_info.description)
									.readMore && (
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
