import { POSTS_PER_PAGE, graphQL } from '../search';

export default new (class Model {
	getPosts = async function () {
		const variables = {
			first: Number(POSTS_PER_PAGE),
			after: '',
			include: ['LARGE'],
			size: 'LARGE',
		};
		const query = `query NewQuery($first: Int!, $after: String, $include: [MediaItemSizeEnum]!, $size: MediaItemSizeEnum!){
		events(after: $after, first: $first) {
    		edges {
				node {
					eventId
					title(format: RENDERED)
					slug
					event_info {
						description
						info {
							day
							endTime
							startTime
						}
					}
					featuredImage {
						node {
							altText
							srcSet(size: $size)
							sizes(size:$size)
							mediaDetails {
								sizes(include: $include) {
									height
									width
									sourceUrl
								}
							}
						}
					}
					eventLocations {
						nodes {
							link
							name
						}
					}
					eventTypes {
						nodes {
							link
							name
						}
					}
				}
			}
			pageInfo {
				hasNextPage
				endCursor
			}
  	}}`;
		const firstRequest = {
			query: query,
			variables: variables,
		};
		const response = await fetch(`${graphQL}`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(firstRequest),
		});
		const { data } = await response.json();
		return data;
	};
})();
