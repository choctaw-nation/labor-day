import React from '@wordpress/element';
import { SortedEventsObject } from '../types';
import RemoveEventButton from './RemoveEvent';
import { downloadICSFile, getTheDay } from './calendarFunctions';
import FeaturedImage from '../search/Presentational/FeaturedImage';
import { PrettyEventData } from '../search/types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLocationDot } from '@fortawesome/free-solid-svg-icons';

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
				info: { day, startTime },
			},
			link,
			title,
		} = event;
		return (
			<div className="cno-event row" key={ eventId }>
				<div
					className={ `cno-event__time cno-event__time--${ day.toLowerCase() } col-lg-1` }
				>
					<div className="cno-event__time--date">
						<span className="cno-event__time--month">SEP</span>
						<span className="cno-event__time--day">{ `${ getTheDay(
							day
						) }` }</span>
						<span className="cno-event__time--day-of-week">
							{ day }
						</span>
						<span className="cno-event__time--time">
							{ startTime }
						</span>
					</div>
				</div>
				{ event.featuredImage && (
					<div className="cno-event__image col-lg-3">
						<FeaturedImage
							featuredImage={ event.featuredImage.node }
						/>
					</div>
				) }
				<div className="cno-event__info col-lg-8">
					<h3 className="cno-event__info--title">{ title }</h3>
					<a
						className="cno-event__location"
						href={ event.locations.uri }
					>
						<FontAwesomeIcon
							icon={ faLocationDot }
							className="cno-event__location--icon"
						/>
						<span className="cno-event__location--text">
							{ event.locations.name }
						</span>
					</a>
					<div
						className="cno-event__info--description"
						dangerouslySetInnerHTML={ { __html: description } }
					/>
					<div className="cno-event__buttons">
						<a href={ link } className="btn__outline--primary ">
							View Event
						</a>
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
				</div>
			</div>
		);
	} );
}
