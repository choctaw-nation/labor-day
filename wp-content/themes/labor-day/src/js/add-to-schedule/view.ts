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
	 * @param {Function} method - A function that returns a Promise with a response string
	 * @return {void}
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
					// eslint-disable-next-line no-console
					console.error( err );
				} );
		} );
	}

	private createButtonMap(): Map< number, HTMLButtonElement > {
		const buttonMap = new Map();
		for ( const button of this.buttons ) {
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
	 * @return {string} A response message based on the response string
	 */
	getResponseMessage( response: string ): string {
		let message = '';
		if ( 'success' === response ) {
			message = `Added to your schedule!`;
		} else if ( 'info' === response ) {
			message = `This event is already in your schedule.`;
		} else {
			message = '';
		}
		return message;
	}

	showScheduleButton() {
		const scheduleButton = document.querySelector( '.schedule-button' );
		if (
			scheduleButton ||
			window.location.href.includes( 'my-schedule' )
		) {
			return;
		}
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
		button.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><path d="M100.4 417.2C104.5 402.6 112.2 389.3 123 378.5L304.2 197.3L338.1 163.4C354.7 180 389.4 214.7 442.1 267.4L476 301.3L442.1 335.2L260.9 516.4C250.2 527.1 236.8 534.9 222.2 539L94.4 574.6C86.1 576.9 77.1 574.6 71 568.4C64.9 562.2 62.6 553.3 64.9 545L100.4 417.2zM156 413.5C151.6 418.2 148.4 423.9 146.7 430.1L122.6 517L209.5 492.9C215.9 491.1 221.7 487.8 226.5 483.2L155.9 413.5zM510 267.4C493.4 250.8 458.7 216.1 406 163.4L372 129.5C398.5 103 413.4 88.1 416.9 84.6C430.4 71 448.8 63.4 468 63.4C487.2 63.4 505.6 71 519.1 84.6L554.8 120.3C568.4 133.9 576 152.3 576 171.4C576 190.5 568.4 209 554.8 222.5C551.3 226 536.4 240.9 509.9 267.4z"/></svg> View Your Schedule`;
		const body = document.querySelector( 'body' );
		body!.insertAdjacentElement( 'beforeend', button );
	}
}
