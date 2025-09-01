/**
 * Gets a Gravity Form element by its ID.
 *
 * @throws {Error} - If the form with the specified ID is not found.
 */
export function getForm(
	formId?: string | number | undefined
): HTMLFormElement {
	const id = formId || getGformId();
	const form = document.querySelector< HTMLFormElement >(
		`form[data-formid="${ id }"]`
	);
	if ( ! form ) {
		throw new Error( `Form with ID ${ id } not found.` );
	} else {
		return form;
	}
}

/**
 * Gets the parent Gravity Form ID from the container element with ID "cno-gform-id".
 * @return {number} - The Gravity Form ID from the container element with ID "cno-gform-id".
 */
function getGformId(): number {
	const container = document.getElementById( 'cno-gform-id' );
	if ( ! container ) {
		throw new Error( 'Container with ID "cno-gform-id" not found.' );
	}
	const gformId = parseInt( container.dataset.cnoGformId || '', 10 );
	if ( isNaN( gformId ) || gformId <= 0 ) {
		throw new Error( 'Invalid or missing gform ID in container.' );
	}
	return gformId;
}

export function getParentFields() {
	const form = getForm();
	const firstName = form.querySelector(
		'input[autocomplete="given-name"]'
	) as HTMLInputElement;
	const lastName = form.querySelector(
		'input[autocomplete="family-name"]'
	) as HTMLInputElement;
	const phone = form.querySelector< HTMLInputElement >(
		'input[autocomplete="tel"]'
	) as HTMLInputElement;
	const email = form.querySelector< HTMLInputElement >(
		'input[autocomplete="email"]'
	);
	const fields = [ firstName, lastName ];
	if ( fields.some( ( field ) => ! field ) ) {
		throw new Error( 'One or more fields not found in the parent form.' );
	}
	return { firstName, lastName, phone, email };
}
