import Model from './model';
import View from './view';

/**
 * Controller class that handles user interaction and data flow between the Model and View.
 */
export class Controller {
	/**
	 * The view object.
	 */
	private view: View;
	/**
	 * Determines whether or not the controller is in debug mode.
	 */
	debug = false;

	constructor() {
		this.view = new View();
		const model = new Model();
		const schedule = model.getSchedule();
		if ( 0 < Object.values( schedule ).flat().length ) {
			this.view.showScheduleButton();
		}
		// Register click event listeners for buttons in the view
		if ( this.view.buttons.length > 0 ) {
			this.view.clickHandler( model.addToSchedule.bind( model ) );
		}

		// Run a debug method if debug mode is enabled
		if ( this.debug ) {
			this.debugMethod();
		}
	}

	/**
	 * A private method used for debugging.
	 * Logs a message and the buttons from the view to the console.
	 *
	 * @private
	 */
	private debugMethod() {
		console.log( 'hello from schedule-handler' );
		console.log( this.view.buttons );
	}
}
