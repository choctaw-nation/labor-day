import { PrettyEventData } from '../search/types';
import { format } from 'date-fns';

/** Receives the day and returns the date (number) */
export function getTheDay(day: string): string | null {
	switch (day) {
		case 'Friday':
			return '1';
		case 'Saturday':
			return '2';
		case 'Sunday':
			return '3';
		default:
			return null;
	}
}

function formatICalDateTime(date: Date): string {
	const dateString = format(date, "yyyyMMdd'T'HHmmss");
	return `${dateString}`;
}
export function downloadICSFile(event: PrettyEventData) {
	let start_date = '';
	switch (event.event_info.info.day) {
		case 'Friday':
			start_date = 'September 1, 2023';
			break;
		case 'Saturday':
			start_date = 'September 2, 2023';
			break;
		case 'Sunday':
			start_date = 'September 3, 2023';
			break;
		default:
			throw new Error('Could not set date!');
	}
	const startDateTime = formatICalDateTime(
		new Date(`${start_date} ${event.event_info.info.startTime}`)
	);

	let endDateTime = '';
	if (event.event_info.info.endTime) {
		endDateTime = formatICalDateTime(
			new Date(`${start_date} ${event.event_info.info.endTime}`)
		);
	} else {
		const defaultDuration = 60 * 60 * 1000; // 1 hour
		const startTime = new Date(
			`${start_date} ${event.event_info.info.startTime}`
		).getTime();
		endDateTime = formatICalDateTime(new Date(startTime + defaultDuration));
	}
	const filename = `${event.title}.ics`;
	const data = `BEGIN:VCALENDAR
VERSION:2.0
BEGIN:VEVENT
DTSTART:${startDateTime}
DTEND:${endDateTime}
SUMMARY:${event.title}
DESCRIPTION:${event.event_info.description}
LOCATION:${event.link}
END:VEVENT
END:VCALENDAR`;

	const blob = new Blob([data], {
		type: 'text/calendar;charset=utf-8',
	});
	const link = document.createElement('a');
	link.href = URL.createObjectURL(blob);
	link.download = filename;
	document.body.appendChild(link);
	link.click();
	document.body.removeChild(link);
}
