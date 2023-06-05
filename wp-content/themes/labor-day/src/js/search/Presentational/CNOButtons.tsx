import React from '@wordpress/element';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export function LocationButton({ href, name }) {
	return (
		<a className="cno-event__buttons--location" href={href}>
			<FontAwesomeIcon icon={['fas', 'location-dot']} />
			&nbsp;
			{name}
		</a>
	);
}

export function ReadMoreButton({ link }) {
	return (
		<a href={link} className="cno-event__buttons--learn-more">
			<FontAwesomeIcon icon={['fas', 'circle-info']} />
			&nbsp;Learn More
		</a>
	);
}

export function RemoveFromSchedule({ removeEvent, eventId, day }) {
	return (
		<a
			className="cno-event__buttons--remove-event"
			onClick={() => {
				removeEvent(eventId, day);
			}}
		>
			&times; Remove Event
		</a>
	);
}

export function ExportToCalendar({ handleClick, eventId }) {
	return (
		<a
			className="cno-event__buttons--calendar"
			onClick={() => {
				handleClick(eventId);
			}}
		>
			<FontAwesomeIcon icon={['far', 'calendar']} />
			&nbsp;Export to Calendar
		</a>
	);
}

export function ShareModalButton({ triggerModal, title, link }) {
	return (
		<div
			className="cno-event__buttons--share"
			onClick={() => {
				triggerModal(title, link);
			}}
		>
			<FontAwesomeIcon icon={['fas', 'share']} />
			&nbsp;Share
		</div>
	);
}
