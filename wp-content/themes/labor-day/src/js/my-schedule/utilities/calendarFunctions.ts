import { PrettyEventData } from './types';
import { format } from 'date-fns';

/** Receives the day and returns the date (number) */
export function getTheDay( day: string ): string | null {
	const dayMap = {
		Friday: '30',
		Saturday: '31',
		Sunday: '1',
	};
	return dayMap[ day ] || null;
}

export function downloadICSFile( event: PrettyEventData ) {
	/* eslint-disable camelcase */
	const datesMap = {
		Friday: 'August 30, 2024',
		Saturday: 'August 31, 2024',
		Sunday: 'September 1, 2024',
	};
	const start_date = datesMap[ event.info.day ];

	const startDateTime = formatICalDateTime(
		new Date( `${ start_date } ${ event.info.start_time }` )
	);

	let endDateTime = '';
	if ( event.info.end_time ) {
		endDateTime = formatICalDateTime(
			new Date( `${ start_date } ${ event.info.end_time }` )
		);
	} else {
		const defaultDuration = 60 * 60 * 1000; // 1 hour
		const startTime = new Date(
			`${ start_date } ${ event.info.start_time }`
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

/**
 * Formats the date to the iCal format.
 *
 * @param  date the date to format
 * @return {string} the correct date format for iCal
 */
function formatICalDateTime( date: Date ): string {
	const dateString = format( date, "yyyyMMdd'T'HHmmss" );
	return `${ dateString }`;
}
