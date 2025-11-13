import React from '@wordpress/element';
import EventButton from '../ui/EventButton';

export default function ReadMoreButton( { link } ) {
	return (
		<EventButton
			element="a"
			classes="text-decoration-none"
			icon={ '<i class="fa-solid fa-circle-info"></i>' }
			text="Learn More"
			href={ link }
		/>
	);
}
