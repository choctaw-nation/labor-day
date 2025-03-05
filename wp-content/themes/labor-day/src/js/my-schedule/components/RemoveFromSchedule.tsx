import React from '@wordpress/element';
import EventButton from '../ui/EventButton';
import { faTrashAlt } from '@fortawesome/free-regular-svg-icons';

export default function RemoveFromSchedule( {
	removeEvent,
	eventId,
	day,
}: {
	removeEvent: CallableFunction;
	eventId: number;
	day: string;
} ) {
	return (
		<EventButton
			classes="text-danger"
			element="button"
			icon={ faTrashAlt }
			text="Remove from Schedule"
			onClick={ () => {
				removeEvent( eventId, day );
			} }
		/>
	);
}
