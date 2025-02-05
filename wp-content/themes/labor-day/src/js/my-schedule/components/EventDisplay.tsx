import React from '@wordpress/element';

// Types
import type { SortedEventsObject, PrettyEventData } from '../utilities/types';

// Components
import SinglePost from './SinglePost';
import ExportToCalendar from './ExportToCalendar';
import RemoveFromSchedule from './RemoveFromSchedule';
import ReadMoreButton from './ReadMoreButton';

// Utilities
import { createExcerpt } from '../utilities/Utilities';
import { downloadICSFile } from '../utilities/calendarFunctions';

export default function EventsDisplay( {
	schedule,
	removeEvent,
	dispatch,
}: {
	schedule: SortedEventsObject;
	removeEvent: CallableFunction;
	dispatch: CallableFunction;
} ) {
	const events: PrettyEventData[] = Object.values( schedule ).flat();

	function handleClick( id: number ) {
		const event = events.filter( ( { eventId } ) => eventId === id );
		downloadICSFile( event[ 0 ] );
	}

	return events.map( ( event: PrettyEventData ) => (
		<SinglePost
			dispatch={ dispatch }
			extendedClass="my-5"
			data={ event }
			key={ event.eventId }
		>
			{ createExcerpt( event.description ).readMore && (
				<ReadMoreButton link={ event.link } />
			) }
			<ExportToCalendar
				handleClick={ handleClick }
				eventId={ event.eventId }
			/>
			<RemoveFromSchedule
				removeEvent={ removeEvent }
				eventId={ event.eventId }
				day={ event.info.day }
			/>
		</SinglePost>
	) );
}
