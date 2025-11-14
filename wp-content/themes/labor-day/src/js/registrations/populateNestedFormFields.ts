import { getForm } from './gformUtils';

type populateNestedFormFieldsProps = {
	firstName: HTMLInputElement;
	lastName: HTMLInputElement;
	phone: HTMLInputElement | null;
	email: HTMLInputElement | null;
};

type FormSlugs = 'war-hoops' | 'volleyball' | 'softball';

/**
 * Populates the nested form fields with the provided values from the parent form.
 */
export default function populateNestedFormFields(
	args: populateNestedFormFieldsProps,
	formSlug: FormSlugs
) {
	try {
		new NestedFormHandler( args, formSlug );
	} catch ( error ) {
		throw new Error(
			`Error populating nested form fields: ${ error.message }`
		);
	}
}

class NestedFormHandler {
	private FORM_ID: number;
	private form: HTMLFormElement;
	private retries: number = 0;
	private maxRetries: number = 5;

	constructor( args: populateNestedFormFieldsProps, formSlug: FormSlugs ) {
		this.FORM_ID = 18;
		try {
			this.getForm().then( () => {
				this.populateFields( args, formSlug );
			} );
		} catch ( error ) {
			throw new Error(
				`Error initializing NestedFormHandler: ${ error.message }`
			);
		}
	}

	private async getForm() {
		let lastError: Error | null = null;
		while ( this.retries < this.maxRetries ) {
			try {
				this.form = getForm( this.FORM_ID );
				break;
			} catch ( error ) {
				lastError = error as Error;
				this.retries++;
				if ( this.retries >= this.maxRetries ) {
					throw lastError;
				}
				// Wait 100ms before retrying
				const wait = ( ms: number ) =>
					new Promise( ( res ) => setTimeout( res, ms ) );
				await wait( 100 );
			}
		}
	}

	/**
	 * Populates the nested form fields with the parent form's provided values.
	 */
	private populateFields(
		args: populateNestedFormFieldsProps,
		formSlug: FormSlugs
	) {
		const formFields = this.getFields();
		if ( ! formFields ) {
			throw new Error( 'Nested form fields not found.' );
		}
		formFields.eventSelect.value = formSlug;
		const { firstName, lastName } = args;
		formFields.firstName.value = firstName.value;
		formFields.lastName.value = lastName.value;
		if ( args.phone ) {
			formFields.phone.value = args.phone.value;
		}
		if ( args.email ) {
			formFields.email.value = args.email.value;
		}
	}

	/**
	 * Gets nested form fields' elements
	 */
	private getFields():
		| {
				eventSelect: HTMLSelectElement;
				firstName: HTMLInputElement;
				lastName: HTMLInputElement;
				phone: HTMLInputElement;
				email: HTMLInputElement;
		}
		| undefined {
		if ( ! this.form ) {
			return;
		}
		const eventSelect = this.form.querySelector(
			this.fieldSelect( 1 )
		) as HTMLSelectElement;
		const firstName = this.form.querySelector(
			this.fieldSelect( '4_3' )
		) as HTMLInputElement;
		const lastName = this.form.querySelector(
			this.fieldSelect( '4_6' )
		) as HTMLInputElement;
		const phone = this.form.querySelector(
			this.fieldSelect( 9 )
		) as HTMLInputElement;
		const email = this.form.querySelector(
			this.fieldSelect( 8 )
		) as HTMLInputElement;
		const fields = [ eventSelect, firstName, lastName, phone, email ];
		if ( fields.some( ( field ) => ! field ) ) {
			throw new Error(
				'One or more fields not found in the nested form.'
			);
		}

		return { firstName, lastName, phone, email, eventSelect };
	}

	/**
	 * Utility to generate query selector string for form fields
	 *
	 * @param id the nested field id
	 * @return
	 */
	private fieldSelect( id: number | string ): string {
		return `#input_${ this.FORM_ID }_${ id }`;
	}
}
