import type { LaborDayEvent } from '../types';
import { format } from 'date-fns';
export function getTheDay( day: string ): string | undefined {
	switch ( day ) {
		case 'Friday':
			return '1';
		case 'Saturday':
			return '2';
		case 'Sunday':
			return '3';
	}
}
export function getTheTime( t: string ): string {
	const time = new Date( `2023-09-01T${ t }` ).toLocaleTimeString( [], {
		hour: 'numeric',
		minute: '2-digit',
		hour12: true,
	} );
	return time;
}
function formatICalDateTime( date: Date ): string {
	const dateString = format( date, "yyyyMMdd'T'HHmmss" );
	return `${ dateString }`;
}
export function downloadICSFile( event: LaborDayEvent ) {
	let start_date = '';
	switch ( event.day ) {
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
			throw new Error( 'Could not set date!' );
	}
	const startDateTime = formatICalDateTime(
		new Date( `${ start_date } ${ event.start_time }` )
	);

	let endDateTime = '';
	if ( event.end_time ) {
		endDateTime = formatICalDateTime(
			new Date( `${ start_date } ${ event.end_time }` )
		);
	} else {
		const defaultDuration = 60 * 60 * 1000; // 1 hour
		const startTime = new Date(
			`${ start_date } ${ event.start_time }`
		).getTime();
		endDateTime = formatICalDateTime(
			new Date( startTime + defaultDuration )
		);
	}
	const filename = `${ event.title }.ics`;
	const data = `BEGIN:VCALENDAR
VERSION:2.0
BEGIN:VEVENT
DTSTART:${ startDateTime }
DTEND:${ endDateTime }
SUMMARY:${ event.title }
DESCRIPTION:${ event.description }
LOCATION:${ event.link }
END:VEVENT
END:VCALENDAR`;

	const blob = new Blob( [ data ], {
		type: 'text/calendar;charset=utf-8',
	} );
	const link = document.createElement( 'a' );
	link.href = URL.createObjectURL( blob );
	link.download = filename;
	document.body.appendChild( link );
	link.click();
	document.body.removeChild( link );
}
