import React from '@wordpress/element';
export default function RemoveEventButton({ removeEvent, id, day }) {
	return (
		<button
			className="my-schedule__remove-event"
			onClick={() => {
				removeEvent(id, day);
			}}>
			X Remove Event
		</button>
	);
}
