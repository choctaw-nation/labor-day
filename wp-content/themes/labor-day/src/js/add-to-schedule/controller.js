import { Model } from './model';
import { View } from './view';
const model = new Model();
const view = new View();
class Controller {
	constructor(model, view) {
		this.model = model;
		this.view = view;
		console.log(this.view.currentPage);
		if (0 < this.view.buttons.length) {
			this.view.clickHandler(this.model.addToSchedule);
		}
	}
}

export const ScheduleManager = new Controller(model, view);
