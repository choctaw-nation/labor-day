import { POSTS_PER_PAGE, graphQL } from './Utilities/Utilities';
import { makeRequestResponse, queryVars } from './types/promises';

export default new (class Model {
	async makeRequest(request: {
		query: string;
		variables: {
			first: number;
			after?: string;
		};
	}): Promise<makeRequestResponse> {
		try {
			const queryParam = encodeURIComponent(request.query);
			const variablesParam = encodeURIComponent(
				JSON.stringify(request.variables)
			);
			const url = `${graphQL}?query=${queryParam}&variables=${variablesParam}`;
			const response = await fetch(url);
			const { data } = await response.json();
			return data;
		} catch (error) {
			throw new Error(`makeRequest error: ${error}`);
		}
	}
	/** Sends a GraphQL Query and returns the posts in a promise
	 * @param {queryVars | undefined} vars the graphQL variables
	 */
	async getPosts(
		after: string = ''
	): Promise<makeRequestResponse | undefined> {
		const variables: queryVars = {
			first: 100,
			after: after ?? '',
		};
		const query = `query Events($first: Int = 4, $after: String = "", $include: [MediaItemSizeEnum] = [LARGE], $size: MediaItemSizeEnum = LARGE) {
  events(after: $after, first: $first) {
    pageInfo {
      hasNextPage
      endCursor
    }
    nodes {
      eventLocations {
        nodes {
          name
          uri
          event_locationId
        }
      }
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
          mediaDetails {
            sizes(include: $include) {
              height
              width
              sourceUrl
            }
          }
          srcSet(size: $size)
		  sizes(size: $size)
        }
      }
      title(format: RENDERED)
      link
	  eventId
      eventTypes {
        nodes {
          event_typeId
          name
          uri
        }
      }
    }
  }
  eventTypes {
    nodes {
      event_typeId
      name
	  uri
    }
  }
  eventLocations {
    nodes {
      name
      uri
      event_locationId
    }
  }
}`;

		const request = {
			query: query,
			variables: variables,
		};
		try {
			const data = await this.makeRequest(request);
			return data;
		} catch (err) {
			console.error(err);
		}
		return undefined;
	}
})();
