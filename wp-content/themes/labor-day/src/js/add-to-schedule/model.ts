import { LaborDayEvent, SortedEventsObject } from '../types';

/** Set in the Global scope with PHP and the Wordpress `localize_script` method */
declare const cnoSiteData: {
	rootUrl: string;
};

export class Model {
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

	addToSchedule({ target }: { target: HTMLElement }): Promise<string> {
		return new Promise((resolve, reject) => {
			try {
				this.#checkTargetElement(target);
				const id: number = Number(target.dataset.id!);
				const route = target.dataset.postType!;
				const schedule = this.getSchedule();
				try {
					this.#getEventData(id, route).then((res) => {
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
	#checkTargetElement(target: HTMLElement) {
		if (!target) {
			throw new Error('No target element provided');
		}
		if ('false' === target.dataset.addToSchedule) {
			throw new Error("This button doesn't control scheduling!");
		}
		if (
			undefined === target.dataset.id ||
			undefined === target.dataset.postType
		) {
			throw new Error(
				`id or route is undefined! \n id: ${target.dataset.id} \n route: ${target.dataset.postType} `,
			);
		}
	}

	#getEventData = async (
		id: number,
		route: string,
	): Promise<LaborDayEvent> => {
		try {
			const response = await fetch(
				`${cnoSiteData.rootUrl}/wp-json/wp/v2/${route}/${id}?_fields=acf,title,link`,
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
}
