export class Model {
	constructor() {}
	getSchedule() {
		const data = JSON.parse(localStorage.getItem('schedule'));
		if (null === data) {
			console.warn('No items exist in local storage.');
		} else return data;
	}
	addToSchedule({ target }) {
		return new Promise((resolve, reject) => {
			if ('false' === target.dataset.addToSchedule) {
				reject(new Error("This button doesn't control scheduling!"));
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
					const check = schedule.filter((item) => item.id === res.id);
					if (check.length === 0) {
						schedule.push(res);
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
		});
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
