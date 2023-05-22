import React from '@wordpress/element';
import SinglePost from './SinglePost';
import { PrettyEventData } from '../types';
import { SortedEventsObject } from '../../search/types';
import CNOButtons from '../Components/CNOButtons';
import { createExcerpt } from '../Utilities';

export default function ResultsContainer({
	posts,
	checkedFilters,
	setShowShareModal,
	setShareEventObject,
}: {
	posts: SortedEventsObject | PrettyEventData[];
	checkedFilters: string[];
	setShowShareModal: Function;
	setShareEventObject: Function;
}) {
	let merged: PrettyEventData[] = [];
	if (!Array.isArray(posts)) {
		merged = Object.values(posts).flat();
	} else merged = posts;
	return (
		<section className="cno-events">
			{merged.map((post: PrettyEventData) => {
				const matchesFilters =
					post.locations?.some((location) =>
						checkedFilters.includes(location.name)
					) ||
					post.type?.some((type) =>
						checkedFilters.includes(type.name)
					) ||
					checkedFilters.includes(post.event_info.info.day);

				if (0 === checkedFilters.length || matchesFilters) {
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
