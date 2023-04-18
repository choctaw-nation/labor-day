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
				method(ev);
			});
		});
	}
}
