import React from '@wordpress/element';
import SinglePost from './SinglePost';
import { EventPost, PrettyEventData } from './types';

function destructureData(data: EventPost): PrettyEventData {
	const {
		eventLocations: { nodes: locations },
	} = data;
	const {
		eventTypes: { nodes: type },
	} = data;
	const { eventId, link, title } = data;
	const { event_info } = data;
	const {
		featuredImage: {
			node: { altText, srcSet, mediaDetails, sizes },
		},
	} = data;
	const size = mediaDetails.sizes[0];
	const destructuredData = {
		locations,
		type,
		sizes,
		eventId,
		link,
		title,
		event_info,
		altText,
		srcSet,
		size,
	};
	return destructuredData;
}
export default function ResultsContainer({
	posts,
	checkedFilters,
}: {
	posts: EventPost[];
}) {
	return (
		<section className="cno-events">
			{posts.map((post) => {
				if (checkedFilters.length === 0) {
					return <SinglePost data={destructureData(post)} />;
				} else if (checkedFilters.length === 1) {
					if (
						checkedFilters.includes(
							post.eventLocations.nodes[0].name,
						) ||
						checkedFilters.includes(post.eventTypes.nodes[0].name)
					) {
						return <SinglePost data={destructureData(post)} />;
					}
				} else {
					if (
						checkedFilters.includes(
							post.eventLocations.nodes[0].name,
						) &&
						checkedFilters.includes(post.eventTypes.nodes[0].name)
					) {
						return <SinglePost data={destructureData(post)} />;
					}
				}
			})}
		</section>
	);
}
