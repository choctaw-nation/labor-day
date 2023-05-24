import {
	EventPost,
	ExcerptObject,
	PrettyEventData,
	SortedEventsObject,
} from './types';
declare const cnoSiteData: {
	rootUrl: string;
	postsPerPage: string;
};
export const { postsPerPage: POSTS_PER_PAGE, rootUrl } = cnoSiteData;
export const graphQL = `${rootUrl}/graphql`;

export const fuzzySearchKeys = {
	keys: [
		{ name: 'title', weight: 4 },
		{ name: 'event_info.description', weight: 2 },
		{ name: 'type.name', weight: 1 },
		{ name: 'locations.name', weight: 1 },
	],
};
export function destructureData(data: EventPost): PrettyEventData {
	const {
		eventLocations: { nodes: locations },
	} = data;
	const {
		eventTypes: { nodes: type },
	} = data;
	const { eventId, link, title } = data;
	const { event_info } = data;
	const destructuredData: PrettyEventData = {
		locations,
		type,
		eventId,
		link,
		title,
		event_info,
	};
	destructuredData.featuredImage = data.featuredImage
		? data.featuredImage.node
		: null;

	return destructuredData;
}

export function createExcerpt(str: string): ExcerptObject {
	const index = str.indexOf('</p>');
	const remainingContent = str.substring(index + 4);
	if (remainingContent.length > 1) {
		return {
			excerpt: str.substring(0, index) + '...</p>',
			readMore: remainingContent.length > 1,
		};
	} else {
		return {
			excerpt: str.substring(0, index + 4),
			readMore: remainingContent.length > 1,
		};
	}
}

export function sortEvents(events: PrettyEventData[]): SortedEventsObject {
	const days: string[] = ['friday', 'saturday', 'sunday'];
	const sortedEvents: SortedEventsObject = {
		friday: [],
		saturday: [],
		sunday: [],
	};
	days.forEach((day) => {
		const dailyEvents = events.filter((ev: PrettyEventData) => {
			return ev.event_info.info.day.toLowerCase() == day;
		});
		dailyEvents.forEach((ev) => sortedEvents[day].push(ev));
	});
	return sortedEvents;
}

export class TimeHandler {
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
