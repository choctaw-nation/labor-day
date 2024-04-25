import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
	faCircleInfo,
	faLocationDot,
	faShare,
} from '@fortawesome/free-solid-svg-icons';
import { faCalendar } from '@fortawesome/free-regular-svg-icons';

export function LocationButton( {
	name,
	slug,
}: {
	name: string;
	slug: string;
} ) {
	return (
		<a
			className="cno-event__buttons--location"
			href={ `${ cnoSiteData.rootUrl }/event_location/${ slug }` }
		>
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
		<button
			className="cno-event__buttons--remove-event text-danger"
			onClick={ () => {
				removeEvent( eventId, day );
			} }
		>
			&times; Remove Event
		</button>
	);
}

export function ExportToCalendar( { handleClick, eventId } ) {
	return (
		<button
			className="cno-event__buttons--calendar"
			onClick={ () => {
				handleClick( eventId );
			} }
		>
			<FontAwesomeIcon icon={ faCalendar } />
			&nbsp;Export to Calendar
		</button>
	);
}

export function ShareModalButton( { dispatch, title, link } ) {
	return (
		<button
			className="cno-event__buttons--share"
			onClick={ () => {
				dispatch( {
					type: 'triggerModal',
					payload: { title, link },
				} );
			} }
		>
			<FontAwesomeIcon icon={ faShare } />
			&nbsp;Share
		</button>
	);
}
