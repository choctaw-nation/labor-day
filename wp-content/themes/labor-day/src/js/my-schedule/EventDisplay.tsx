import React from '@wordpress/element';
import { SortedEventsObject } from '../search/types';
import RemoveEventButton from './RemoveEvent';
import { downloadICSFile } from './calendarFunctions';
import { PrettyEventData } from '../search/types';
import SinglePost from '../search/Presentational/SinglePost';
import { createExcerpt } from '../search/Utilities';

export default function EventsDisplay( {
	schedule,
	removeEvent,
}: {
	schedule: SortedEventsObject;
	removeEvent: CallableFunction;
} ) {
	const events = Object.values( schedule ).flat();
	function handleClick( id: number ) {
		const event = events.filter( ( event ) => event.id === id );
		downloadICSFile( event[ 0 ] );
	}
	return events.map( ( event: PrettyEventData ) => {
		const {
			eventId,
			event_info: {
				description,
				info: { day },
			},
			link,
		} = event;
		return (
			<SinglePost data={ event } key={ eventId }>
				<div className="cno-event__buttons">
					{ createExcerpt( description ).readMore && (
						<a href={ link } className="btn__outline--primary ">
							View Event
						</a>
					) }
					<button
						className="btn__outline--secondary "
						onClick={ () => {
							handleClick( eventId );
						} }
					>
						Export to Calendar
					</button>
					<RemoveEventButton
						removeEvent={ removeEvent }
						id={ eventId }
						day={ day }
					/>
				</div>
			</SinglePost>
		);
	} );
}
