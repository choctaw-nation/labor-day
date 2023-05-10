import React from '@wordpress/element';
import { LaborDayEvent } from '../types';
import RemoveEventButton from './RemoveEvent';
import { downloadICSFile, getTheTime } from './calendarFunctions';

export default function EventsDisplay( {
	schedule,
	day,
	removeEvent,
}: {
	schedule: Array< LaborDayEvent >;
	removeEvent: CallableFunction;
	day: 'Friday' | 'Saturday' | 'Sunday';
} ): JSX.Element {
	function handleClick( id: number ) {
		const event = schedule.filter( ( event ) => event.id === id );
		downloadICSFile( event[ 0 ] );
	}
	return (
		<>
			{ schedule.map(
				( {
					title,
					link,
					start_time,
					end_time,
					description,
					id,
				}: LaborDayEvent ) => {
					return (
						<div className="my-schedule__event" key={ id }>
							<RemoveEventButton
								removeEvent={ removeEvent }
								id={ id }
								day={ day }
							/>
							<div className="my-schedule__event-meta">
								<div className="my-schedule__event-meta--start">
									<span className="my-schedule__event-meta--label">
										Start Time:
									</span>{ ' ' }
									<span className="my-schedule__event-meta--info">{ `${ getTheTime(
										start_time
									) }` }</span>
								</div>
								{ end_time && (
									<div className="my-schedule__event-meta--end">
										<span className="my-schedule__event-meta--label">
											End Time:
										</span>{ ' ' }
										<span className="my-schedule__event-meta--info">{ `${ getTheTime(
											end_time
										) }` }</span>
									</div>
								) }
							</div>
							<div className="my-schedule__event-details">
								<h3 className="my-schedule__event-details--title">
									{ title }
								</h3>
								<p className="my-schedule__event-details--description">
									{ description }
								</p>
								<div className="my-schedule__buttons">
									<a
										href={ link }
										className="btn__outline--primary"
									>
										View Event
									</a>
									<button
										className="btn__outline--secondary"
										onClick={ () => {
											handleClick( id );
										} }
									>
										Export to Calendar
									</button>
								</div>
							</div>
						</div>
					);
				}
			) }
		</>
	);
}
