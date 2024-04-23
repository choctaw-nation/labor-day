import { PrettyEventData } from '../search/types';
import { SortedEventsObject } from '../search/types';
declare const cnoSiteData: { rootUrl: string };

export default class Model {
	/**
	 * Retrieves the user's saved schedule from local storage or initializes an empty schedule.
	 * @returns {SortedEventsObject} The user's saved schedule
	 */
	getSchedule(): SortedEventsObject {
		const now = new Date();
		const end = new Date( 'September 1, 202' );
		const initialState: SortedEventsObject = {
			friday: [],
			saturday: [],
			sunday: [],
		};
		if ( now > end ) {
			localStorage.removeItem( 'schedule' );
			return initialState;
		}
		const data: string | null = localStorage.getItem( 'schedule' );
		const jsonData: SortedEventsObject = data ? JSON.parse( data ) : null;
		if ( null === jsonData ) {
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
	addToSchedule( ev ): Promise< string > {
		const { target } = ev;
		return new Promise( ( resolve, reject ) => {
			try {
				this.checkTargetElement( target );
				const id: number = Number( target.dataset.id! );
				const schedule = this.getSchedule();
				if ( ! schedule ) return;
				try {
					this.getEventData( id ).then( ( res ) => {
						const dayProp = res[ 0 ].info.day.toLowerCase();
						/** @var check
						 * whether or not an event already exists in user's schedule  */
						const check: PrettyEventData[] | null = schedule[
							dayProp
						].filter(
							( item: PrettyEventData ) =>
								item.eventId === res.eventId
						);
						if ( check?.length === 0 ) {
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
				throw err;
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
			const response = await fetch(
				`${ cnoSiteData.rootUrl }/wp-json/cno/v1/events?id=${ id }`
			);
			const data = await response.json();
			return data;
		} catch ( err ) {
			throw new Error( err );
		}
	};
}
