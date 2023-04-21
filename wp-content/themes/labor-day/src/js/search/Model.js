import { POSTS_PER_PAGE, graphQL } from '../search/App';

export default new (class Model {
	async makeRequest(request) {
		try {
			const response = await fetch(`${graphQL}`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(request),
			});
			const { data } = await response.json();
			return data;
		} catch (error) {
			console.error('makeRequest error:', error);
			throw error;
		}
	}
	async getFilters() {
		const query = `
		query Filters {
			eventTypes {
				nodes {
					event_typeId
					name
				}
			}
			eventLocations {
				nodes {
					name
					event_locationId
				}
			}
		}`;

		try {
			return await this.makeRequest(query);
		} catch (err) {
			console.error(err);
		}
	}
	async getPosts() {
		const variables = {
			first: Number(POSTS_PER_PAGE),
			after: '',
			include: ['LARGE'],
			size: 'LARGE',
		};
		const query = `query Events($first: Int!, $after: String, $include: [MediaItemSizeEnum]!, $size: MediaItemSizeEnum!){
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
							event_locationId
						}
					}
					eventTypes {
						nodes {
							event_typeId
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
		try {
			return await this.makeRequest(firstRequest);
		} catch (err) {
			console.error(err);
		}
	}
})();
