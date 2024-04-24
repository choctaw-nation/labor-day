import React from 'react';

// Types
import { SortedEventsObject, PrettyEventData } from '../search/types';

// Components
import SinglePost from '../search/Presentational/Posts/SinglePost';
import {
	ExportToCalendar,
	ReadMoreButton,
	RemoveFromSchedule,
} from '../search/Presentational/CNOButtons';

// Utilities
import { createExcerpt } from '../search/Utilities/Utilities';
import { downloadICSFile } from './calendarFunctions';

export default function EventsDisplay( {
	schedule,
	removeEvent,
}: {
	schedule: SortedEventsObject;
	removeEvent: CallableFunction;
} ) {
	const events: PrettyEventData[] = Object.values( schedule ).flat();

	function handleClick( id: number ) {
		const event = events.filter( ( { eventId } ) => eventId === id );
		downloadICSFile( event[ 0 ] );
	}

	return events.map( ( event: PrettyEventData ) => (
		<SinglePost extendedClass="my-5" data={ event } key={ event.eventId }>
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
