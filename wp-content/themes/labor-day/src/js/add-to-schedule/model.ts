import { LaborDayEvent, SortedEventsObject } from '../types';

/**
 * @typedef {Object} SiteData
 * @property {string} rootUrl - The root URL of the site
 */

/**
 * Set in the Global scope with PHP and the Wordpress `localize_script` method
 */
declare const cnoSiteData: { rootUrl: string };

export default new (class Model {
	/**
	 * Retrieves the user's saved schedule from local storage or initializes an empty schedule.
	 * @returns {SortedEventsObject} The user's saved schedule
	 */
	getSchedule(): SortedEventsObject {
		const data: string | null = localStorage.getItem('schedule');
		const jsonData: SortedEventsObject = data ? JSON.parse(data) : null;
		if (null === jsonData) {
			const initialState: SortedEventsObject = {
				friday: [],
				saturday: [],
				sunday: [],
			};
			return initialState;
		} else return jsonData;
	}

	/**
	 * Adds an event to the user's schedule.
	 * @param {Object} param - The event's target element
	 * @param {HTMLElement} param.target - The event's target element
	 * @returns {Promise<string>} A promise that resolves with either "success" or "info"
	 * @throws {Error} Throws an error if no target element is provided, the target element doesn't control scheduling, or the ID or route is undefined.
	 */
	addToSchedule({ target }: { target: HTMLElement }): Promise<string> {
		return new Promise((resolve, reject) => {
			try {
				this.checkTargetElement(target);
				const id: number = Number(target.dataset.id!);
				const schedule = this.getSchedule();
				try {
					this.getEventData(id).then((res) => {
						const dayProp = res.day.toLowerCase();
						const check = schedule[dayProp].filter(
							(item: LaborDayEvent) => item.id === res.id,
						);
						if (check.length === 0) {
							schedule[dayProp].push(res);
							localStorage.setItem(
								'schedule',
								JSON.stringify(schedule),
							);
							resolve('success');
						} else if (check) {
							resolve('info');
						}
					});
				} catch (err) {
					reject(err);
				}
			} catch (err) {
				console.error(err);
			}
		});
	}

	/**
	 * Checks if the target element is valid for scheduling.
	 * @param {HTMLElement} target - The event's target element
	 * @throws {Error} Throws an error if no target element is provided, the target element doesn't control scheduling, or the ID or route is undefined.
	 */
	private checkTargetElement(target: HTMLElement) {
		if (!target) {
			throw new Error('No target element provided');
		}
		if ('false' === target.dataset.addToSchedule) {
			throw new Error("This button doesn't control scheduling!");
		}
		if (undefined === target.dataset.id) {
			throw new Error(
				`id or route is undefined! \n id: ${target.dataset.id} `,
			);
		}
	}

	/**
	 * Retrieves event data from the API.
	 * @param {number} id - The ID of the event
	 * @param {string} route - The type of the event
	 * @returns {Promise<LaborDayEvent>} A promise that resolves to an object containing event details.
	 * @throws {Error} Will throw an error if there is an issue with the fetch request or parsing the response.
	 */
	private getEventData = async (id: number): Promise<LaborDayEvent> => {
		try {
			const response = await fetch(
				`${cnoSiteData.rootUrl}/wp-json/wp/v2/events/${id}?_fields=acf,title,link`,
			);
			const data = await response.json();
			const {
				acf: { info },
			} = data;
			const event: LaborDayEvent = {
				id: id,
				link: data.link,
				title: data.title.rendered,
				description: data.acf.description,
				day: info.day,
				start_time: info.start_time,
				end_time: info.end_time,
			};
			return event;
		} catch (err) {
			throw new Error(err);
		}
	};
})();
