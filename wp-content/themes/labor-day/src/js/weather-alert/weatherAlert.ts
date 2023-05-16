// import { Modal } from 'bootstrap';
export default class WeatherAlert {
	private weatherAlertDialog: HTMLDialogElement | null;
	private confirmBtn: HTMLButtonElement | null;
	constructor() {
		this.weatherAlertDialog = document.getElementById('weatherAlert');
		this.confirmBtn = this.weatherAlertDialog.querySelector('#confirmBtn');
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
	}
}
