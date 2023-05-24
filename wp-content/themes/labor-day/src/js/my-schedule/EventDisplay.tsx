import React, { useState } from '@wordpress/element';
import { SortedEventsObject } from '../search/types';
import { downloadICSFile } from './calendarFunctions';
import { PrettyEventData } from '../search/types';
import SinglePost from '../search/Presentational/SinglePost';
import { createExcerpt } from '../search/Utilities';

export default function EventsDisplay({
	schedule,
	removeEvent,
}: {
	schedule: SortedEventsObject;
	removeEvent: CallableFunction;
}) {
	const events: PrettyEventData[] = Object.values(schedule).flat();
	function handleClick(id: number) {
		const event = events.filter(({ eventId }) => eventId === id);
		downloadICSFile(event[0]);
	}
	return events.map((event: PrettyEventData) => {
		const {
			eventId,
			event_info: {
				description,
				info: { day },
			},
			link,
		} = event;
		return (
			<SinglePost data={event} key={eventId}>
				{createExcerpt(description).readMore && (
					<a href={link} className="cno-event__buttons--learn-more">
						<i className="fa-solid fa-circle-info"></i>
						&nbsp;Learn More
					</a>
				)}
				<a
					className="cno-event__buttons--calendar"
					onClick={() => {
						handleClick(eventId);
					}}
				>
					<i className="fa-regular fa-calendar"></i>&nbsp;Export to
					Calendar
				</a>
				<a
					className="cno-event__buttons--remove-event"
					onClick={() => {
						removeEvent(eventId, day);
					}}
				>
					X Remove Event
				</a>
			</SinglePost>
		);
	});
}
