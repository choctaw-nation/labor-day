import { PrettyEventData } from '../search/types';
import { SortedEventsObject } from '../types';

/**
 * @typedef {Object} SiteData
 * @property {string} rootUrl - The root URL of the site
 */

/**
 * Set in the Global scope with PHP and the Wordpress `localize_script` method
 */
declare const cnoSiteData: { rootUrl: string };

export default new ( class Model {
	/**
	 * Retrieves the user's saved schedule from local storage or initializes an empty schedule.
	 * @returns {SortedEventsObject} The user's saved schedule
	 */
	getSchedule(): SortedEventsObject {
		const data: string | null = localStorage.getItem( 'schedule' );
		const jsonData: SortedEventsObject = data ? JSON.parse( data ) : null;
		if ( null === jsonData ) {
			const initialState: SortedEventsObject = {
				friday: [],
				saturday: [],
				sunday: [],
			};
			return initialState;
		} else return jsonData;
	}

	/**
	 * Adds an event to the user's schedule.
	 * @param {Object} param - The event's target element
	 * @param {HTMLElement} param.target - The event's target element
	 * @returns {Promise<string>} A promise that resolves with either "success" or "info"
	 * @throws {Error} Throws an error if no target element is provided, the target element doesn't control scheduling, or the ID or route is undefined.
	 */
	addToSchedule( { target }: { target: HTMLElement } ): Promise< string > {
		return new Promise( ( resolve, reject ) => {
			try {
				this.checkTargetElement( target );
				const id: number = Number( target.dataset.id! );
				const schedule = this.getSchedule();
				try {
					this.getEventData( id ).then( ( res ) => {
						const dayProp = res.event_info.info.day.toLowerCase();
						const check = schedule[ dayProp ].filter(
							( item: PrettyEventData ) =>
								item.eventId === res.eventId
						);
						if ( check.length === 0 ) {
							schedule[ dayProp ].push( res );
							localStorage.setItem(
								'schedule',
								JSON.stringify( schedule )
							);
							resolve( 'success' );
						} else if ( check ) {
							resolve( 'info' );
						}
					} );
				} catch ( err ) {
					reject( err );
				}
			} catch ( err ) {
				console.error( err );
			}
		} );
	}

	/**
	 * Checks if the target element is valid for scheduling.
	 * @param {HTMLElement} target - The event's target element
	 * @throws {Error} Throws an error if no target element is provided, the target element doesn't control scheduling, or the ID or route is undefined.
	 */
	private checkTargetElement( target: HTMLElement ) {
		if ( ! target ) {
			throw new Error( 'No target element provided' );
		}
		if ( 'false' === target.dataset.addToSchedule ) {
			throw new Error( "This button doesn't control scheduling!" );
		}
		if ( undefined === target.dataset.id ) {
			throw new Error(
				`id or route is undefined! \n id: ${ target.dataset.id } `
			);
		}
	}

	/**
	 * Retrieves event data from the API.
	 * @param {number} id - The ID of the event
	 * @param {string} route - The type of the event
	 * @returns {Promise<LaborDayEvent>} A promise that resolves to an object containing event details.
	 * @throws {Error} Will throw an error if there is an issue with the fetch request or parsing the response.
	 */
	private getEventData = async ( id: number ): Promise< PrettyEventData > => {
		try {
			const response = await fetch( `${ cnoSiteData.rootUrl }/graphql/`, {
				method: 'POST',
				body: JSON.stringify( this.queryString( id ) ),
				headers: {
					'Content-Type': 'application/json',
				},
			} );
			const data = await response.json();
			const {
				data: {
					events: { nodes },
				},
			} = data;

			const event: PrettyEventData = {
				eventId: nodes[ 0 ].eventId,
				link: nodes[ 0 ].link,
				title: nodes[ 0 ].title,
				event_info: {
					description: nodes[ 0 ].event_info.description,
					info: {
						day: nodes[ 0 ].event_info.info.day,
						startTime: nodes[ 0 ].event_info.info.startTime,
						endTime: nodes[ 0 ].event_info.info.endTime,
					},
				},
				locations: nodes[ 0 ].eventLocations.nodes[ 0 ],
				type: nodes[ 0 ].eventTypes.nodes[ 0 ],
			};
			event.featuredImage = nodes[ 0 ].featuredImage;
			console.log( event );
			return event;
		} catch ( err ) {
			throw new Error( err );
		}
	};
	private queryString( id: number ): object {
		const query = {
			query: `query Events {
  events(where: {id: ${ id }}) {
    nodes {
      eventId
      title(format: RENDERED)
      link
      event_info {
        info {
          day
          endTime
          startTime
        }
        description
      }
      eventLocations {
        nodes {
          name
          uri
          event_locationId
        }
      }
      eventTypes {
        nodes {
          name
          uri
          event_typeId
        }
      }
      featuredImage {
        node {
          altText
          mediaDetails {
            sizes(include: [LARGE]) {
              height
              name
              width
              sourceUrl
            }
          }
          srcSet(size: LARGE)
		  sizes(size: LARGE)
        }
      }
    }
  }
}`,
		};
		return query;
	}
} )();
