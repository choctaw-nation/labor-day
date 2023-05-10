import React from '@wordpress/element';
import { LaborDayEvent, SortedEventsObject } from '../types';
import RemoveEventButton from './RemoveEvent';
import { downloadICSFile, getTheTime, getTheDay } from './calendarFunctions';

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
	return events.map(
		( {
			title,
			day,
			link,
			start_time,
			end_time,
			description,
			id,
		}: LaborDayEvent ) => {
			return (
				<div className="event row" key={ id }>
					<div className="event__time col-lg-1">
						<div className="event__time--date">
							<span className="event__time--month">SEP</span>
							<span className="event__time--day">{ `${ getTheDay(
								day
							) }` }</span>
							<span className="event__time--day-of-week">
								{ day }
							</span>
							<span className="event__time--time">{ `${ getTheTime(
								start_time
							) }` }</span>
						</div>
					</div>
					<div className="event__image col-lg-3">image</div>
					<div className="event__info col-lg-8">
						<h3 className="event__info--title">{ title }</h3>
						<p className="event__info--description">
							{ description }
						</p>
						<div className="event__buttons row">
							<a className="col" href="">
								Location
							</a>
							<a
								href={ link }
								className="btn__outline--primary col"
							>
								View Event
							</a>
							<button
								className="btn__outline--secondary col"
								onClick={ () => {
									handleClick( id );
								} }
							>
								Export to Calendar
							</button>
							<RemoveEventButton
								removeEvent={ removeEvent }
								id={ id }
								day={ day }
							/>
						</div>
					</div>
				</div>
			);
		}
	);
}
