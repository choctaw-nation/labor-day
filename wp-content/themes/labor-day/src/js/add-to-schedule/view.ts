import { faPencil } from '@fortawesome/free-solid-svg-icons';
/**
 * View class to manage the display of the UI components
 */
export default class View {
	MESSAGE_TIMEOUT = 2500;

	/**
	 * Current page URL
	 */
	currentPage: string;

	/**
	 * Constructs a new View object
	 */
	constructor() {
		this.currentPage = window.location.href;
	}

	get buttons(): HTMLCollectionOf< HTMLButtonElement > {
		return document.getElementsByClassName(
			'add-to-schedule'
		) as HTMLCollectionOf< HTMLButtonElement >;
	}

	/**
	 * Adds click event listener to buttons and handles click events
	 * @param {function} method - A function that returns a Promise with a response string
	 * @returns {void}
	 */
	clickHandler( method: Function ): void {
		const resultsContainer = document.getElementById( 'search-results' );
		if ( ! resultsContainer ) {
			throw new Error( 'No search results container found' );
		}
		resultsContainer.addEventListener( 'click', ( ev ) => {
			if ( this.buttons.length === 0 || ! ev.target ) {
				return;
			}
			if (
				! ( ev.target instanceof HTMLButtonElement ) ||
				! ev.target.classList.contains( 'add-to-schedule' )
			) {
				return;
			}
			const buttonMap = this.createButtonMap();
			const confirmationContainer = buttonMap.get(
				Number( ev.target.dataset.id )
			);

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
		} );
	}

	private createButtonMap(): Map< number, HTMLButtonElement > {
		const buttonMap = new Map();
		for ( let button of this.buttons ) {
			buttonMap.set(
				Number( button.getAttribute( 'data-id' )! ),
				button
			);
		}
		return buttonMap;
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

	showScheduleButton() {
		const scheduleButton = document.querySelector( '.schedule-button' );
		if ( scheduleButton || window.location.href.includes( 'my-schedule' ) )
			return;
		const button = document.createElement( 'a' );
		button.classList.add(
			'schedule-button',
			'shadow',
			'btn',
			'btn-primary',
			'position-fixed',
			'text-capitalize',
			'rounded-4',
			'fs-6',
			'd-flex',
			'gap-2',
			'align-items-center'
		);
		button.setAttribute( 'href', '/my-schedule' );
		button.innerHTML = `<svg viewBox="0 0 ${ faPencil.icon[ 0 ] } ${ faPencil.icon[ 0 ] }"><path d="${ faPencil.icon[ 4 ] }"></svg> View Your Schedule`;
		const body = document.querySelector( 'body' );
		body!.insertAdjacentElement( 'beforeend', button );
	}
}
