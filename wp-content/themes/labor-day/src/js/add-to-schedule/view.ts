import { faPencil } from '@fortawesome/free-solid-svg-icons';
/**
 * View class to manage the display of the UI components
 */
export default class View {
	MESSAGE_TIMEOUT = 4000;
	/**
	 * List of HTMLButtonElement objects
	 */
	buttons: NodeListOf< HTMLButtonElement >;

	/**
	 * Current page URL
	 */
	currentPage: string;

	/**
	 * Constructs a new View object
	 */
	constructor() {
		this.currentPage = location.href;
		this.buttons = document.querySelectorAll< HTMLButtonElement >(
			'[data-add-to-schedule]'
		);
	}

	/**
	 * Adds click event listener to buttons and handles click events
	 * @param {function} method - A function that returns a Promise with a response string
	 * @returns {void}
	 */
	clickHandler( method: Function ): void {
		if ( this.buttons.length === 0 ) {
			return;
		}

		this.buttons.forEach( ( button ) => {
			button.addEventListener(
				'click',
				( ev ) => {
					ev.preventDefault();
					const confirmationContainer = this.buttons[ 0 ];

					if (
						! confirmationContainer ||
						confirmationContainer.innerHTML ===
							'<a href="/my-schedule"> View Schedule</a>'
					) {
						return;
					}
					confirmationContainer.innerText = `Loading...`;
					method( ev )
						.then( ( response: string ) => {
							confirmationContainer.innerHTML =
								this.getResponseMessage( response );
							setTimeout( () => {
								confirmationContainer.innerHTML =
									'<a href="/my-schedule"> View Schedule</a>';
							}, this.MESSAGE_TIMEOUT );
							this.showScheduleButton();
						} )
						.catch( ( err: any ) => {
							console.error( err );
						} );
				},
				{ once: true }
			);
		} );
	}

	/**
	 * Returns a response message based on the response string
	 * @param {string} response - A string representing the response
	 * @returns {string} A response message based on the response string
	 */
	getResponseMessage( response: string ): string {
		let message = '';
		if ( 'success' === response ) {
			message = `Added to your schedule!`;
		} else if ( 'info' === response ) {
			message = `This event is already in your schedule.`;
		} else message = '';
		return message;
	}

	/**
	 * Shows the floating schedule button
	 * @returns {void}
	 */
	showScheduleButton() {
		const scheduleButton = document.querySelector( '.schedule-button' );
		if ( scheduleButton || window.location.href.includes( 'my-schedule' ) )
			return;
		const div = document.createElement( 'div' );
		div.classList.add( 'schedule-button' );
		div.innerHTML = `<a href="/my-schedule"><svg viewBox="0 0 ${ faPencil.icon[ 0 ] } ${ faPencil.icon[ 0 ] }"><path d="${ faPencil.icon[ 4 ] }"></svg> View Your Schedule</a>`;
		const body = document.querySelector( 'body' );
		body!.insertAdjacentElement( 'beforeend', div );
	}
}
