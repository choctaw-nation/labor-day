import React from '@wordpress/element';
import { faCalendar } from '@fortawesome/free-regular-svg-icons';
import EventButton from '../ui/CNOButtons';

export default function ExportToCalendar( { handleClick, eventId } ) {
	return (
		<EventButton
			element="button"
			onClick={ () => {
				handleClick( eventId );
			} }
			icon={ faCalendar }
			text="Export to Calendar"
		/>
	);
}
