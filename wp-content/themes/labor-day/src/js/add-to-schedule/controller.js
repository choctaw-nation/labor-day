import { Model } from './model';
import { View } from './view';
const model = new Model();
const view = new View();
class Controller {
	debug = true;
	constructor(model, view) {
		this.model = model;
		this.view = view;
		if (0 < this.view.buttons.length) {
			this.view.clickHandler(this.model.addToSchedule.bind(this.model));
		}
		if (this.debug) this.#debugMethod();
	}
	#debugMethod() {
		console.log('hello from schedule-handler');
		console.log(this.view.buttons);
	}
}

export const ScheduleManager = new Controller(model, view);
