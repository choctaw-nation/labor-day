import { EventPost, PrettyEventData } from './types';
declare const cnoSiteData: {
	rootUrl: string;
	postsPerPage: string;
};
export const { postsPerPage: POSTS_PER_PAGE, rootUrl } = cnoSiteData;
export const graphQL = `${ rootUrl }/graphql`;

export const fuzzySearchKeys = {
	keys: [
		{ name: 'title', weight: 1 },
		{ name: 'event_info.description', weight: 0.5 },
		{ name: 'event_info.info.day', weight: 0.03 },
		{ name: 'type.name', weight: 0.8 },
		{ name: 'locations.name', weight: 0.8 },
	],
};
export function destructureData( data: EventPost ): PrettyEventData {
	const {
		eventLocations: { nodes: locations },
	} = data;
	const {
		eventTypes: { nodes: type },
	} = data;
	const { eventId, link, title } = data;
	const { event_info } = data;
	const destructuredData = {
		locations,
		type,
		eventId,
		link,
		title,
		event_info,
		featuredImage: null,
	};
	if ( data.featuredImage ) {
		const {
			featuredImage: {
				node: { altText, srcSet, mediaDetails, sizes },
			},
		} = data;
		const size = mediaDetails.sizes[ 0 ];
		destructuredData.featuredImage = {
			sizes,
			altText,
			srcSet,
			size,
		};
	}
	return destructuredData;
}
