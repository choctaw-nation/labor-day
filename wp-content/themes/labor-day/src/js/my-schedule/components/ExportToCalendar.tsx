import React from '@wordpress/element';
import EventButton from '../ui/EventButton';

export default function ExportToCalendar( { handleClick, eventId } ) {
	return (
		<EventButton
			element="button"
			onClick={ () => {
				handleClick( eventId );
			} }
			icon={ '<i class="fa-regular fa-calendar"></i>' }
			text="Export to Calendar"
		/>
	);
}
