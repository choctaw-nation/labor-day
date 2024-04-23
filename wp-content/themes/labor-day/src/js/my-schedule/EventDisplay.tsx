import React from '@wordpress/element';

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
	return events.map( ( event: PrettyEventData ) => {
		const {
			eventId,
			link,
			description,
			info: { day },
		} = event;
		return (
			<SinglePost data={ event } key={ eventId }>
				<>
					{ createExcerpt( description ).readMore && (
						<ReadMoreButton link={ link } />
					) }
					<ExportToCalendar
						handleClick={ handleClick }
						eventId={ eventId }
					/>
					<RemoveFromSchedule
						removeEvent={ removeEvent }
						eventId={ event.eventId }
						day={ day }
					/>
				</>
			</SinglePost>
		);
	} );
}
