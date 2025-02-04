import React from '@wordpress/element';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
	faCircleInfo,
	faLocationDot,
	faShare,
	IconDefinition,
} from '@fortawesome/free-solid-svg-icons';

interface EventButtonProps {
	element: 'button' | 'a';
	href?: string;
	icon: IconDefinition;
	onClick: () => void;
	text: string;
}
export default function EventButton( {
	element,
	icon,
	onClick,
	text,
	href,
}: EventButtonProps ) {
	const Button = element;
	return (
		<Button className="cno-event-button" onClick={ onClick } href={ href }>
			<FontAwesomeIcon icon={ icon } />
			&nbsp;
			{ text }
		</Button>
	);
}
export function LocationButton( {
	name,
	slug,
}: {
	name: string;
	slug: string;
} ) {
	return (
		<a
			className="cno-event__buttons--location text-decoration-none"
			href={ `${ window.cnoSiteData.rootUrl }/event_location/${ slug }` }
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
