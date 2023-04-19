import '../../styles/pages/my-schedule.scss';
import { createRoot } from '@wordpress/element';
import EventsDisplay from './EventDisplay';

function App() {
	const data = JSON.parse(localStorage.getItem('schedule'));
	const schedule = data.sort((a, b) => {
		if (a.day > b.day) return 1;
		if (a.day < b.day) return -1;
		if (a.start_time > b.start_time) return 1;
		if (a.start_time < b.start_time) return -1;
		return 0;
	});
	const friday = schedule.filter((event) => event.day === 'Friday');
	const saturday = schedule.filter((event) => event.day === 'Saturday');
	const sunday = schedule.filter((event) => event.day === 'Sunday');

	return (
		<div className="my-schedule">
			{friday.length > 0 && (
				<div className="my-schedule__friday">
					<h2 className="day-label">Friday</h2>
					<EventsDisplay schedule={friday} />
				</div>
			)}

			{saturday.length > 0 && (
				<div className="my-schedule__saturday">
					<h2 className="day-label">Saturday</h2>
					<EventsDisplay schedule={saturday} />
				</div>
			)}
			{sunday.length > 0 && (
				<div className="my-schedule__sunday">
					<h2 className="day-label">Sunday</h2>
					<EventsDisplay schedule={sunday} />
				</div>
			)}
		</div>
	);
}
createRoot(document.getElementById('app')).render(<App />);
