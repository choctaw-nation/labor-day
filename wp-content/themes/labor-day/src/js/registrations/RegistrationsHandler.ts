import '../../styles/pages/registrations.scss';
import updateAddEntryButtonClasses from './updateAddEntryButtonClasses';
import usePopulateModalFields from './usePopulateModalFields';

window.addEventListener( 'DOMContentLoaded', () => {
	try {
		updateAddEntryButtonClasses();
		usePopulateModalFields( '.tingle-modal', populateFields );
	} catch ( error ) {
		console.error( error );
	}
} );

function populateFields() {
	console.log( 'populating fields from other form' );
}
