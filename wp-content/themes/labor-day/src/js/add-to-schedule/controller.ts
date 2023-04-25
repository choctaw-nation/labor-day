import Model from './model';
import View from './view';

/**
 * Controller class that handles user interaction and data flow between the Model and View.
 */
export class Controller {
	/**
	 * Determines whether or not the controller is in debug mode.
	 */
	debug = false;

	constructor() {
		// Register click event listeners for buttons in the view
		if (View.buttons.length > 0) {
			View.clickHandler(Model.addToSchedule.bind(Model));
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
		console.log(View.buttons);
	}
}

// Export an instance of the Controller with default configuration
export const ScheduleManager = new Controller();
