import { Model } from './model';
import { View } from './view';

class Controller {
	debug: boolean = false;
	model: Model;
	view: View;

	constructor(model: Model, view: View) {
		this.model = model;
		this.view = view;

		if (0 < this.view.buttons.length) {
			this.view.clickHandler(this.model.addToSchedule.bind(this.model));
		}

		if (this.debug) this.#debugMethod();
	}

	#debugMethod(): void {
		console.log('hello from schedule-handler');
		console.log(this.view.buttons);
	}
}

export const ScheduleManager = new Controller(new Model(), new View());
