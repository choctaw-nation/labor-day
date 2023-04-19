export class Model {
	constructor() {}
	getSchedule() {
		const data = JSON.parse(localStorage.getItem('schedule'));
		if (null === data) {
			console.warn('No items exist in local storage.');
		} else return data;
	}
	addToSchedule({ target }) {
		if ('false' === target.dataset.addToSchedule) {
			console.error("This button doesn't control scheduling!");
			return;
		}
		let schedule = JSON.parse(localStorage.getItem('schedule'));
		if (!schedule) {
			schedule = [];
		}
		try {
			this.#getEventData(
				Number(target.dataset.id),
				target.dataset.postType,
			).then((res) => {
				schedule.push(res);
				localStorage.setItem('schedule', JSON.stringify(schedule));
			});
		} catch (err) {
			console.error(err);
		}
	}
	#getEventData = async (id, route) => {
		try {
			const response = await fetch(
				`${cnoSiteData.rootUrl}/wp-json/wp/v2/${route}/${id}?_fields=acf,title,link`,
			);
			const data = await response.json();
			const {
				acf: { info },
			} = data;
			const event = {
				link: data.link,
				title: data.title.rendered,
				description: data.acf.description,
				day: info.day,
				start_time: info.start_time,
				end_time: info.end_time,
			};
			console.log(event);
			return event;
		} catch (err) {
			throw new Error(err);
		}
	};
}
