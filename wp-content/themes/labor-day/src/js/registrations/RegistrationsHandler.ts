import '../../styles/pages/registrations.scss';
import { getParentFields } from './gformUtils';
import populateNestedFormFields from './populateNestedFormFields';

const functionsMap = {
	'war-hoops': () =>
		populateNestedFormFields( getParentFields(), 'war-hoops' ),
	volleyball: () =>
		populateNestedFormFields( getParentFields(), 'volleyball' ),
	softball: () => populateNestedFormFields( getParentFields(), 'softball' ),
};

window.addEventListener( 'DOMContentLoaded', () => {
	try {
		const addEntryButton = updateAddEntryButtonClasses();
		addEntryButton.addEventListener( 'click', () => {
			try {
				populateFields();
			} catch ( error ) {
				console.error( error.message );
			}
		} );
	} catch ( error ) {
		console.error( error );
	}
} );

/**
 * Populates the fields in the nested form based on the current URL path.
 */
function populateFields() {
	const pathSegments = window.location.pathname
		.split( '/' )
		.filter( Boolean );
	const slug =
		pathSegments.length >= 2 &&
		pathSegments[ pathSegments.length - 2 ] === 'registrations'
			? pathSegments[ pathSegments.length - 1 ]
			: '';
	if ( slug in functionsMap ) {
		// wrapping in setTimeout to ensure the nested form exists
		setTimeout( () => {
			try {
				functionsMap[ slug ]();
			} catch ( error ) {
				console.error(
					`Error populating fields for ${ slug }: ${ error.message }`
				);
			}
		}, 100 );
	} else {
		throw new Error( `No function registered for form: ${ slug }` );
	}
}

/**
 * Adds Bootstrap classes to the "Add Entry" button in a nested form.
 *
 * @param nestedFormId {string|number|undefined} - The ID of the nested form for which to update the add entry button classes.
 * @returns {HTMLButtonElement} - The updated "Add Entry" button element.
 * @throws {Error} - If the "Add Entry" button is not found for the specified nested form ID.
 */
function updateAddEntryButtonClasses(
	nestedFormId?: string | number
): HTMLButtonElement {
	const formId = nestedFormId || 18;
	const addEntryButton = document.querySelector< HTMLButtonElement >(
		`button.gpnf-add-entry[data-nestedformid="${ formId }"]`
	);
	if ( ! addEntryButton ) {
		throw new Error(
			`Add Entry button not found for nested form ID: ${ formId }`
		);
	}
	addEntryButton.classList.add( 'btn', 'btn-primary', 'btn-sm', 'rounded-0' );
	return addEntryButton;
}
