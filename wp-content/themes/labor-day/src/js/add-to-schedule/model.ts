import { destructureData } from '../search/Utilities';
import { RawEventPost, PrettyEventData } from '../search/types';
import { SortedEventsObject } from '../search/types';
declare const cnoSiteData: { rootUrl: string };
export default new (class Model {
	/**
	 * Retrieves the user's saved schedule from local storage or initializes an empty schedule.
	 * @returns {SortedEventsObject} The user's saved schedule
	 */
	getSchedule(): SortedEventsObject | undefined {
		const now = new Date();
		const end = new Date('September 3, 2023');
		if (now > end) {
			localStorage.removeItem('schedule');
			return;
		}
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
	addToSchedule(ev): Promise<string> {
		const { target } = ev;
		const schedule = this.getSchedule();
		return new Promise((resolve, reject) => {
			try {
				this.checkTargetElement(target);
				const id: number = Number(target.dataset.id!);
				const schedule = this.getSchedule();
				console.log(schedule);
				try {
					this.getEventData(id).then((res) => {
						const dayProp = res.event_info.info.day.toLowerCase();
						/** @var check whether or not an event already exists in user's schedule  */
						const check: PrettyEventData[] | null = schedule[
							dayProp
						].filter(
							(item: PrettyEventData) =>
								item.eventId === res.eventId
						);
						if (check?.length === 0) {
							schedule[dayProp].push(res);
							localStorage.setItem(
								'schedule',
								JSON.stringify(schedule)
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
				`id or route is undefined! \n id: ${target.dataset.id} `
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
	private getEventData = async (id: number): Promise<PrettyEventData> => {
		try {
			const response = await fetch(
				`${cnoSiteData.rootUrl}/graphql?query=${encodeURIComponent(
					this.queryString(id)
				)}`
			);
			const data = await response.json();
			const {
				data: {
					events: { nodes },
				},
			}: { data: { events: { nodes: RawEventPost[] } } } = data;
			const event = destructureData(nodes[0]);
			return event;
		} catch (err) {
			throw new Error(err);
		}
	};
	private queryString(id: number): string {
		const query = `query Events {
  events(where: {id: ${id}}) {
    nodes {
      eventId
      title(format: RENDERED)
      link
      event_info {
        info {
          day
          endTime
          startTime
        }
        description
      }
      eventLocations {
        nodes {
          name
          uri
          event_locationId
        }
      }
      eventTypes {
        nodes {
          name
          uri
          event_typeId
        }
      }
      featuredImage {
        node {
          altText
          mediaDetails {
            sizes(include: [LARGE]) {
              height
              name
              width
              sourceUrl
            }
          }
          srcSet(size: LARGE)
		  sizes(size: LARGE)
        }
      }
    }
  }
}`;
		return query;
	}
})();
