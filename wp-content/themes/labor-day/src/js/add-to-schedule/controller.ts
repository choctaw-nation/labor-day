import { Model } from './model';
import { View } from './view';

/**
 * Controller class that handles user interaction and data flow between the Model and View.
 */
class Controller {
	/**
	 * Determines whether or not the controller is in debug mode.
	 */
	debug = true;

	/**
	 * The Model instance used by the controller.
	 */
	model: Model;

	/**
	 * The View instance used by the controller.
	 */
	view: View;

	/**
	 * Creates a new Controller instance.
	 *
	 * @param {Model} model - The Model instance used by the controller.
	 * @param {View} view - The View instance used by the controller.
	 */
	constructor(model, view) {
		this.model = model;
		this.view = view;

		// Register click event listeners for buttons in the view
		if (this.view.buttons.length > 0) {
			this.view.clickHandler(this.model.addToSchedule.bind(this.model));
		}

		// Run a debug method if debug mode is enabled
		if (this.debug) {
			this.#debugMethod();
		}
	}

	/**
	 * A private method used for debugging.
	 * Logs a message and the buttons from the view to the console.
	 *
	 * @private
	 */
	#debugMethod() {
		console.log('hello from schedule-handler');
		console.log(this.view.buttons);
	}
}

// Export an instance of the Controller with default configuration
export const ScheduleManager = new Controller(new Model(), new View());
