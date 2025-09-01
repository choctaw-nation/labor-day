export default class WeatherAlert {
	private weatherAlertDialog: HTMLDialogElement | null;
	private confirmBtn: HTMLButtonElement | null;
	private overlay: HTMLElement | null;
	constructor() {
		if (
			[
				document.getElementById( 'weatherAlert' ),
				document.getElementById( 'confirmBtn' ),
			].some( ( el ) => null === el )
		) {

		} else {
			this.weatherAlertDialog = document.querySelector( '#weatherAlert' );
			this.confirmBtn = document.querySelector( '#confirmBtn' );
			this.overlay = document.querySelector(
				'.weather-alert__overlay.overlay'
			);
			this.dialogHandler();
		}
	}
	dialogHandler() {
		this.weatherAlertDialog!.showModal();
		this.confirmBtn?.addEventListener( 'click', ( ev ) => {
			ev.preventDefault();
			this.overlay!.style.display = 'none';
			this.weatherAlertDialog?.close();
		} );
	}
}
