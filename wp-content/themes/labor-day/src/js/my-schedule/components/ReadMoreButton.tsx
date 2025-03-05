import { faCircleInfo } from '@fortawesome/free-solid-svg-icons';
import React from '@wordpress/element';
import EventButton from '../ui/EventButton';

export default function ReadMoreButton( { link } ) {
	return (
		<EventButton
			element="a"
			classes="text-decoration-none"
			icon={ faCircleInfo }
			text="Learn More"
			href={ link }
		/>
	);
}
