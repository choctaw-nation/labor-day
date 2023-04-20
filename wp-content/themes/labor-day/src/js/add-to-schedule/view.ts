export class View {
	buttons: NodeListOf<HTMLButtonElement>;
	currentPage: string;

	constructor() {
		this.currentPage = location.href;
		this.buttons = document.querySelectorAll<HTMLButtonElement>(
			'[data-add-to-schedule]',
		);
	}

	clickHandler(method: (ev: MouseEvent) => Promise<string>): void {
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
				if (!confirmationContainer) return;
				method(ev)
					.then((response) => {
						confirmationContainer.innerHTML = `<div class='alert alert-${response}' role='alert'>${this.getResponseMessage(
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

	private getResponseMessage(response: string): string {
		if ('success' === response) {
			return `Added to your schedule!`;
		}
		if ('info' === response) {
			return `This is already in your schedule.`;
		}
		return '';
	}
}
