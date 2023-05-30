import React from '@wordpress/element';
import SinglePost from './SinglePost';
import { PrettyEventData } from '../types';
import { SortedEventsObject } from '../../search/types';
import CNOButtons from '../Components/CNOButtons';
import { createExcerpt } from '../Utilities';
import { selectedFilterObject } from '../types/eventFilters';

export default function ResultsContainer({
	posts,
	selectedFilters,
	setShowShareModal,
	setShareEventObject,
}: {
	posts: SortedEventsObject | PrettyEventData[];
	selectedFilters: selectedFilterObject;
	setShowShareModal: Function;
	setShareEventObject: Function;
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
							setShareEventObject={setShareEventObject}
							data={post}
							setShowShareModal={setShowShareModal}
							key={post.eventId}
						>
							<CNOButtons
								eventId={post.eventId}
								link={post.link}
								canReadMore={
									createExcerpt(post.event_info.description)
										.readMore
								}
							/>
						</SinglePost>
					);
				}
				return null;
			})}
		</section>
	);
}
