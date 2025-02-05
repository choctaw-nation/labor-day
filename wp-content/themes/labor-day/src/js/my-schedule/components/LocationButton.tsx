import React from '@wordpress/element';
import EventButton from '../ui/EventButton';
import { faLocationDot } from '@fortawesome/free-solid-svg-icons';

export default function LocationButton( {
	name,
	slug,
}: {
	name: string;
	slug: string;
} ) {
	return (
		<EventButton
			element="a"
			classes="cno-event__buttons--location text-decoration-none"
			icon={ faLocationDot }
			text={ name }
			href={ `${ window.cnoSiteData.rootUrl }/event_location/${ slug }` }
		/>
	);
}
