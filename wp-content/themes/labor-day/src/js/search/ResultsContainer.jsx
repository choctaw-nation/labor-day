import SinglePost from './SinglePost';

function destructureData(data) {
	const {
		eventLocations: { nodes: location },
	} = data;
	const {
		eventTypes: { nodes: type },
	} = data;
	const { eventId, slug, title } = data;
	const { event_info } = data;
	const {
		featuredImage: {
			node: { altText, srcSet, mediaDetails, sizes },
		},
	} = data;
	const size = mediaDetails.sizes[0];

	return {
		location,
		type,
		sizes,
		eventId,
		slug,
		title,
		event_info,
		altText,
		srcSet,
		size,
	};
}
export default function ResultsContainer({ posts }) {
	return (
		<section className="cno-events">
			{posts.events.edges.map((post) => (
				<SinglePost data={destructureData(post.node)} />
			))}
		</section>
	);
}
