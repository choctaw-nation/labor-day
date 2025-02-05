import React, { useState, useEffect } from '@wordpress/element';
import Model from '../../add-to-schedule/model';
import View from '../../add-to-schedule/view';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { faCalendar } from '@fortawesome/free-regular-svg-icons';
import type { PrettyEventData } from '../utilities/types';

const model = new Model();
const view = new View();

export function AddToScheduleButton( { eventId } ) {
	const [ responseMessage, setResponseMessage ] =
		useState( 'Add to Schedule' );
	const [ inSchedule ] = useState( function () {
		const schedule = model.getSchedule();
		const sched: PrettyEventData[] = Object.values( schedule ).flat();
		if ( sched.length === 0 ) return;
		const filteredSched = sched.filter(
			( event ) => event.eventId === eventId
		);
		if ( filteredSched[ 0 ] ) {
			return filteredSched[ 0 ].eventId === eventId;
		} else return false;
	} );

	/** Updates Text On responseMessage change. */
	useEffect( () => {
		if ( 'Add to Schedule' === responseMessage ) return;
		const timeoutId = setTimeout( () => {
			setResponseMessage( 'View Schedule' );
			view.showScheduleButton();
		}, view.MESSAGE_TIMEOUT );
		return () => clearTimeout( timeoutId );
	}, [ responseMessage ] );

	/** Adds event to user's schedule and updates the responseMessage. */
	async function addToSchedule( ev ) {
		try {
			const response = await model.addToSchedule( ev );
			const message = view.getResponseMessage( response );
			if ( '' !== message ) {
				setResponseMessage( message );
			} else setResponseMessage( '' );
		} catch ( err ) {
			console.error( err );
		}
	}
	// Render Logic
	if ( 'View Schedule' === responseMessage ) {
		return (
			<button>
				<FontAwesomeIcon icon={ faCalendar } />
				&nbsp;<a href="/my-schedule">{ responseMessage }</a>
			</button>
		);
	} else if ( inSchedule ) {
		return (
			<button className="cno-event__buttons--add-to-schedule">
				<FontAwesomeIcon icon={ faCalendar } />
				&nbsp;<a href="/my-schedule">In Schedule</a>
			</button>
		);
	} else
		return (
			<button
				className="cno-event__buttons--add-to-schedule"
				data-add-to-schedule="true"
				data-id={ eventId }
				onClick={ ( ev ) => {
					setResponseMessage( 'Adding to schedule...' );
					addToSchedule( ev );
				} }
			>
				<FontAwesomeIcon icon={ faPlus } /> { responseMessage }
			</button>
		);
}
