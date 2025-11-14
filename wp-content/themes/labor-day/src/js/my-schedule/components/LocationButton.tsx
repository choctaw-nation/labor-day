import React from '@wordpress/element';
import EventButton from '../ui/EventButton';

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
			classes="cno-event__buttons--location text-decoration-none d-flex align-items-center"
			icon={ '<i class="fa-solid fa-location-dot"></i>' }
			text={ name }
			href={ `${ window.cnoSiteData.rootUrl }/event_location/${ slug }` }
		/>
	);
}
