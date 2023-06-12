export default class TimeHandler {
	/** Removes minutes from a time string if the time is at the top of the hour. (e.g. "9:00 am" to "9 AM")
	 * @param {string} time the time string
	 * @returns {string} the shortened time.
	 */
	private removeMinutes(time: string): string {
		return `${time.slice(0, time.indexOf(':00'))} ${time
			.slice(-2)
			.toUpperCase()}`;
	}
	/** adds an hour from startTime to create a default endTime
	 * @param {string} startTime the startTime
	 * @returns {string} the new endTime
	 */
	private addOneHour(startTime: string): string {
		const [hours, minutes, period] = startTime.split(/:| /);
		let hour = parseInt(hours, 10);
		const isAM = period.toLowerCase() === 'am';

		if (hour === 12) {
			// Convert 12-hour format to 24-hour format
			hour = isAM ? 0 : 12;
		} else if (!isAM) {
			// Add 12 hours for PM times except for 12:00 PM
			hour += 12;
		}

		const time = new Date();
		time.setHours(hour);
		time.setMinutes(parseInt(minutes, 10) + 60);

		const newTime = time.toLocaleTimeString([], {
			hour: 'numeric',
			minute: '2-digit',
		});
		return newTime;
	}

	handleTime({
		startTime,
		endTime,
	}: {
		startTime: string;
		endTime: string | null;
	}): string {
		let end = '';
		const start = startTime.includes(':00')
			? this.removeMinutes(startTime)
			: startTime;
		if (endTime?.includes(':00')) {
			end = this.removeMinutes(endTime);
		} else if (null === endTime) {
			const defaultEndTime = this.addOneHour(startTime);
			end = defaultEndTime.includes(':00')
				? this.removeMinutes(defaultEndTime)
				: defaultEndTime;
		}
		if (start.slice(-2).toUpperCase() == end.slice(-2)) {
			const finalString = `${start.slice(0, -2)} &ndash; ${end.slice(
				0,
				-2
			)}${start.slice(-2).toUpperCase()}`;
			return finalString;
		} else return `${start.toUpperCase()} &ndash; ${end}`;
	}
}
