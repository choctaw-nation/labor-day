import { TimeRemainingObject } from './types';

/**
 * Calculate time remaining
 *
 * @param targetDate the target date string
 */
export function calculateTimeRemaining( targetDate:string ):TimeRemainingObject|null {
	if ( ! targetDate ) {
		return null;
	}

	const now = new Date().getTime();
	const target = new Date( targetDate ).getTime();
	const difference = target - now;

	if ( difference <= 0 ) {
		return {
			days: 0,
			hours: 0,
			minutes: 0,
			seconds: 0,
			isExpired: true,
		};
	}

	const days = Math.floor( difference / ( 1000 * 60 * 60 * 24 ) );
	const hours = Math.floor(
		( difference % ( 1000 * 60 * 60 * 24 ) ) / ( 1000 * 60 * 60 )
	);
	const minutes = Math.floor(
		( difference % ( 1000 * 60 * 60 ) ) / ( 1000 * 60 )
	);
	const seconds = Math.floor( ( difference % ( 1000 * 60 ) ) / 1000 );

	return {
		days,
		hours,
		minutes,
		seconds,
		isExpired: false,
	};
}
