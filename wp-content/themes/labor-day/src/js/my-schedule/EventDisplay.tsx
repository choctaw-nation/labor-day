import React from '@wordpress/element';
import { LaborDayEvent } from '../types';
import RemoveEventButton from './RemoveEvent';

function getTheTime(t: string) {
	const time = new Date(`2023-09-01T${t}`).toLocaleTimeString([], {
		hour: 'numeric',
		minute: '2-digit',
		hour12: true,
	});
	return time;
}

export default function EventsDisplay({
	schedule,
	day,
	removeEvent,
}: {
	schedule: Array<LaborDayEvent>;
	removeEvent: CallableFunction;
	day: 'Friday' | 'Saturday' | 'Sunday';
}) {
	return (
		<>
			{schedule.map(
				({
					title,
					link,
					start_time,
					end_time,
					description,
					id,
				}: LaborDayEvent) => {
					return (
						<div className="my-schedule__event" key={id}>
							<RemoveEventButton
								removeEvent={removeEvent}
								id={id}
								day={day}
							/>
							<div className="my-schedule__event-meta">
								<div className="my-schedule__event-meta--start">
									<span className="my-schedule__event-meta--label">
										Start Time:
									</span>{' '}
									<span className="my-schedule__event-meta--info">{`${getTheTime(
										start_time,
									)}`}</span>
								</div>
								{end_time && (
									<div className="my-schedule__event-meta--end">
										<span className="my-schedule__event-meta--label">
											End Time:
										</span>{' '}
										<span className="my-schedule__event-meta--info">{`${getTheTime(
											end_time,
										)}`}</span>
									</div>
								)}
							</div>
							<div className="my-schedule__event-details">
								<h3 className="my-schedule__event-details--title">
									{title}
								</h3>
								<p className="my-schedule__event-details--description text-content">
									{description}
								</p>
								<a
									href={link}
									className="btn__outline--primary">
									View Event
								</a>
							</div>
						</div>
					);
				},
			)}
		</>
	);
}
