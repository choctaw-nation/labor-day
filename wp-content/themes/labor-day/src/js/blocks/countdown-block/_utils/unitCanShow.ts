import { TimeRemainingObject } from './types';

/**
 *
 * @param timeRemaining   Time Remaining Object
 * @param key             the key to lookup in the time remaining object
 * @param showEmptyLabels whether empty labels should show
 */
export function unitCanShow(
	timeRemaining: TimeRemainingObject,
	key: keyof TimeRemainingObject,
	showEmptyLabels: boolean
): boolean {
	if ( showEmptyLabels ) {
		return true;
	}
	if ( 'days' === key && timeRemaining[ key ] ) {
		return true;
	}
	if ( 'hours' === key && ( timeRemaining[ key ] || timeRemaining.days ) ) {
		return true;
	}
	if (
		'minutes' === key &&
		( timeRemaining[ key ] || timeRemaining.hours )
	) {
		return true;
	}
	if (
		'seconds' === key &&
		( timeRemaining[ key ] || timeRemaining.minutes )
	) {
		return true;
	}
	return false;
}
