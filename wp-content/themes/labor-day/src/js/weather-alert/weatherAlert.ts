export default class WeatherAlert {
	private weatherAlertDialog: HTMLDialogElement | null;
	private confirmBtn: HTMLButtonElement | null;
	private overlay: HTMLElement | null;
	constructor() {
		this.weatherAlertDialog = document.querySelector('#weatherAlert');
		this.confirmBtn = this.weatherAlertDialog.querySelector('#confirmBtn');
		this.overlay = document.querySelector(
			'.weather-alert__overlay.overlay'
		);
		if (
			[this.weatherAlertDialog, this.confirmBtn].some((el) => null == el)
		) {
			return;
		} else {
			this.dialogHandler();
		}
	}
	dialogHandler() {
		this.weatherAlertDialog!.showModal();
		this.confirmBtn?.addEventListener('click', (ev) => {
			ev.preventDefault();
			this.overlay.style.display = 'none';
			this.weatherAlertDialog?.close();
		});
	}
}
