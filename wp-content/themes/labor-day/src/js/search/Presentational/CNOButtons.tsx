import React from '@wordpress/element';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
	faCircleInfo,
	faLocationDot,
	faShare,
} from '@fortawesome/free-solid-svg-icons';
import { faCalendar } from '@fortawesome/free-regular-svg-icons';

export function LocationButton( { href, name } ) {
	return (
		<a className="cno-event__buttons--location" href={ href }>
			<FontAwesomeIcon icon={ faLocationDot } />
			&nbsp;
			{ name }
		</a>
	);
}

export function ReadMoreButton( { link } ) {
	return (
		<a href={ link } className="cno-event__buttons--learn-more">
			<FontAwesomeIcon icon={ faCircleInfo } />
			&nbsp;Learn More
		</a>
	);
}

export function RemoveFromSchedule( { removeEvent, eventId, day } ) {
	return (
		<a
			className="cno-event__buttons--remove-event"
			onClick={ () => {
				removeEvent( eventId, day );
			} }
		>
			&times; Remove Event
		</a>
	);
}

export function ExportToCalendar( { handleClick, eventId } ) {
	return (
		<a
			className="cno-event__buttons--calendar"
			onClick={ () => {
				handleClick( eventId );
			} }
		>
			<FontAwesomeIcon icon={ faCalendar } />
			&nbsp;Export to Calendar
		</a>
	);
}

export function ShareModalButton( { dispatch, title, link } ) {
	return (
		<div
			className="cno-event__buttons--share"
			onClick={ () => {
				dispatch( {
					type: 'triggerModal',
					payload: { title: title, link: link },
				} );
			} }
		>
			<FontAwesomeIcon icon={ faShare } />
			&nbsp;Share
		</div>
	);
}
