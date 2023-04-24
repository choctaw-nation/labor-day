/**
 * View class to manage the display of the UI components
 */
export default new (class View {
	/**
	 * List of HTMLButtonElement objects
	 */
	buttons: NodeListOf<HTMLButtonElement>;

	/**
	 * Current page URL
	 */
	currentPage: string;

	/**
	 * Constructs a new View object
	 */
	constructor() {
		this.currentPage = location.href;
		this.buttons = document.querySelectorAll<HTMLButtonElement>(
			'[data-add-to-schedule]',
		);
	}

	/**
	 * Adds click event listener to buttons and handles click events
	 * @param {function} method - A function that returns a Promise with a response string
	 * @returns {void}
	 */
	clickHandler(method: Function): void {
		if (this.buttons.length === 0) {
			return;
		}

		this.buttons.forEach((button) => {
			button.addEventListener('click', (ev) => {
				ev.preventDefault();
				const { target } = ev;

				const confirmationContainer = (target as Element)
					?.closest('.cno-event__buttons')
					?.querySelector('.cno-event-schedule-confirmation');

				if (!confirmationContainer) {
					return;
				}

				method(ev)
					.then((response: string) => {
						confirmationContainer.innerHTML = `<div class='alert alert-${response}' role='alert'>${this.getResponseMessage(
							response,
						)}</div>`;
						setTimeout(() => {
							confirmationContainer.innerHTML = '';
						}, 7000);
					})
					.catch((err: any) => {
						console.error(err);
					});
			});
		});
	}

	/**
	 * Returns a response message based on the response string
	 * @param {string} response - A string representing the response
	 * @returns {string} A response message based on the response string
	 */
	getResponseMessage(response: string): string {
		if ('success' === response) {
			return `Added to your schedule!`;
		}
		if ('info' === response) {
			return `This is already in your schedule.`;
		}
		return '';
	}
})();
