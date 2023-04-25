import { POSTS_PER_PAGE, graphQL } from '../search/Utilities';

export default new ( class Model {
	async makeRequest( request ) {
		try {
			const response = await fetch( `${ graphQL }`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify( request ),
			} );
			const { data } = await response.json();
			return data;
		} catch ( error ) {
			console.error( 'makeRequest error:', error );
			throw error;
		}
	}
	async getPosts() {
		const variables = {
			first: Number( POSTS_PER_PAGE ),
			after: '',
			include: [ 'LARGE' ],
			size: 'LARGE',
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
          link
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
              name
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
          link
        }
      }
    }
  }
  eventTypes {
    nodes {
      event_typeId
      name
	  link
    }
  }
  eventLocations {
    nodes {
      name
      link
      event_locationId
    }
  }
}`;

		const request = {
			query: query,
			variables: variables,
		};
		try {
			const data = await this.makeRequest( request );
			return data;
		} catch ( err ) {
			console.error( err );
		}
	}
} )();
