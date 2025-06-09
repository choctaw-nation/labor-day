/**
 * Adds Bootstrap classes to the "Add Entry" button in a nested form.
 * @param nestedFormId {string|number|undefined} - The ID of the nested form for which to update the add entry button classes.
 * @returns
 */
export default function updateAddEntryButtonClasses(
	nestedFormId?: string | number
): void {
	const formId = nestedFormId || 18;
	const addEntryButton = document.querySelector(
		`button.gpnf-add-entry[data-nestedformid="${ formId }"]`
	);
	if ( ! addEntryButton ) return;
	addEntryButton.classList.add( 'btn', 'btn-primary', 'btn-sm', 'rounded-0' );
}
