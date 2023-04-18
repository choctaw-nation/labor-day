export class Model {
	constructor() {}
	getSchedule() {
		const data = JSON.parse(localStorage.getItem('schedule'));
		if (null === data) {
			console.warn('No items exist in local storage.');
		} else return data;
	}
	addToSchedule({ target }) {
		console.log('click', target);
		if (false === target.dataset.addToSchedule) {
			console.error("This button doesn't control scheduling!");
			return;
		}
		console.log(target.dataset.addToSchedule);
		// localStorage.setItem('schedule', JSON.stringify(item));
	}
}
