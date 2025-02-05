import React from '@wordpress/element';
import EventButton from '../ui/EventButton';
import { faShare } from '@fortawesome/free-solid-svg-icons';
export default function ShareModalButton( { title, link } ) {
	return (
		<EventButton
			onClick={ () => {
				console.log( 'click', title, link );
			} }
			element="button"
			icon={ faShare }
			text="Share"
		/>
	);
}
