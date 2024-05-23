import { EventInfo } from '../types';

/**
 * Handles time formatting
 */
export default class TimeHandler {
	/**
	 * Removes minutes from a time string if the time is at the top of the hour.
	 * (e.g. "9:00 am" to "9 AM")
	 *
	 * @param {string} time the time string
	 * @returns {string} the shortened time.
	 */
	private formatTimeString( time: string ): string {
		if ( time.includes( ':00' ) ) {
			const timeString = time.includes( ':00' )
				? time.slice( 0, time.indexOf( ':00' ) )
				: time;
			return `${ timeString.toUpperCase() } ${ time
				.slice( -2 )
				.toUpperCase() }`;
		} else {
			return time.toUpperCase();
		}
	}

	/**
	 * Removes the Meridiem indicator from the time string if they are the same
	 * (e.g. "9 AM - 10 AM" to "9 - 10 AM")
	 *
	 * @param start Start Time
	 * @param end End Time
	 */
	private handleMeridiemIndicator( start, end ): string {
		const startMeridiem = start.slice( -2 ).toUpperCase();
		const endMeridiem = end.slice( -2 ).toUpperCase();
		if ( startMeridiem === endMeridiem ) {
			const finalString = `${ start.slice( 0, -2 ) } &ndash; ${ end.slice(
				0,
				-2
			) } ${ startMeridiem }`;
			return finalString;
		} else {
			return `${ start } &ndash; ${ end }`;
		}
	}

	/**
	 * Handles the time formatting for the event.
	 * @param {EventInfo} eventInfo the event info object.
	 * @returns {string} the formatted time string.
	 */
	handleTime( eventInfo: EventInfo ): string {
		const { start_time, end_time } = eventInfo;

		const start = this.formatTimeString( start_time );
		// Early return if there is no end time.
		if ( ! end_time ) return start;

		const end = this.formatTimeString( end_time );
		return this.handleMeridiemIndicator( start, end );
	}
}
