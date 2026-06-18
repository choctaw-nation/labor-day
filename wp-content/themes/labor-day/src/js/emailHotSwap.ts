// Email Hot Swap
export function hotSwapEmailValues() {
	const subscribeButton = document.getElementById(
		'subscribe-modal-trigger'
	);
	if ( subscribeButton ) {
		subscribeButton.addEventListener( 'click', () => fillEmailValues() );
	}
}

/** Grabs email from initial form and fills in the Gravity Form field */
function fillEmailValues() {
	const modal = document.getElementById( 'subscribe-modal' );
	const emailInput = document.getElementById( 'email' );
	if ( null === emailInput ) {
		return;
	}
	const email = emailInput.value ?? '';
	const preFilledEmail = modal.querySelector( 'input[type="email"]' );
	if ( preFilledEmail ) {
		preFilledEmail.value = email;
	}
}
