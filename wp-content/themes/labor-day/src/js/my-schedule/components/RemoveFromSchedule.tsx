import React from '@wordpress/element';
import EventButton from '../ui/EventButton';

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
			icon={ '<i class="fa-regular fa-trash-can"></i>' }
			text="Remove from Schedule"
			onClick={ () => {
				removeEvent( eventId, day );
			} }
		/>
	);
}
