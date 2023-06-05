import React from '@wordpress/element';
import { SortedEventsObject } from '../search/types';
import { downloadICSFile } from './calendarFunctions';
import { PrettyEventData } from '../search/types';
import SinglePost from '../search/Presentational/SinglePost';
import { createExcerpt } from '../search/Utilities';
import {
	ExportToCalendar,
	ReadMoreButton,
	RemoveFromSchedule,
} from '../search/Presentational/CNOButtons';

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
			link,
			event_info: {
				description,
				info: { day },
			},
		} = event;
		return (
			<SinglePost data={event} key={eventId}>
				<>
					{createExcerpt(description).readMore && (
						<ReadMoreButton link={link} />
					)}
					<ExportToCalendar
						handleClick={handleClick}
						eventId={eventId}
					/>
					<RemoveFromSchedule
						removeEvent={removeEvent}
						eventId={event.eventId}
						day={day}
					/>
				</>
			</SinglePost>
		);
	});
}
