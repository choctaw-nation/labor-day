export class View {
	buttons = [];
	currentPage = '';
	constructor() {
		this.currentPage = location.href;
		this.buttons = document.querySelectorAll('[data-add-to-schedule]');
	}

	clickHandler(method) {
		if (0 === this.buttons.length) return;

		this.buttons.forEach((button) => {
			button.addEventListener('click', (ev) => {
				ev.preventDefault();
				const confirmationContainer = ev.target
					.closest('.cno-event__buttons')
					.querySelector('.cno-event-schedule-confirmation');
				method(ev)
					.then((response) => {
						confirmationContainer.innerHTML = `<div class='alert alert-${response}' role='alert'>${this.#getResponseMessage(
							response,
						)}</div>`;
						setTimeout(() => {
							confirmationContainer.innerHTML = '';
						}, 7000);
					})
					.catch((err) => {
						console.error(err);
					});
			});
		});
	}

	#getResponseMessage(response) {
		if ('success' === response) {
			return `Added to your schedule!`;
		}
		if ('info' === response) {
			return `This is already in your schedule.`;
		}
	}
}
