import { useState, useEffect } from '@wordpress/element';

function getTheDate(day) {
	let date = '';
	if ('Friday' === day) {
		date = 'September 1';
	} else if ('Saturday' === day) {
		date = 'September 2';
	} else {
		date = 'September 3';
	}
	return date;
}

function getTheTime(t) {
	const time = new Date(`2023-09-01T${t}`).toLocaleTimeString([], {
		hour: 'numeric',
		minute: '2-digit',
		hour12: true,
	});
	return time;
}

export default function EventsDisplay({ schedule }) {
	const [events, setEvents] = useState(schedule);
	function removeEvent({ target }) {
		const id = target.closest('.my-schedule__event').dataset.id;
		console.log(`removing event ${id}`);
		const filteredEvents = events.filter((event) => event.id !== id);
		setEvents(filteredEvents);
	}
	useEffect(() => {
		// localStorage.setItem('schedule', JSON.stringify(events));
	}, []);
	return events.map(
		({ title, link, start_time, end_time, description, id }) => {
			return (
				<div className="my-schedule__event" data-id={id} key={id}>
					<button
						className="my-schedule__remove-event"
						onClick={removeEvent}>
						X Remove Event
					</button>
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
						<a href={link} className="btn__outline--primary">
							View Event
						</a>
					</div>
				</div>
			);
		},
	);
}
