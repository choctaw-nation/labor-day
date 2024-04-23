import { rootUrl } from './Utilities/Utilities';
import { PrettyEventData } from './types';

class Model {
	async makeRequest(
		request: {
			query?: string;
		} = {}
	) {
		const url = `${ rootUrl }/wp-json/cno/v1/events${
			request.query ? `?s=${ request.query }` : ''
		}`;
		const response = await fetch( url );
		if ( ! response.ok ) {
			const data = await response.json();
			throw new Error( `Error: ${ data.message }` );
		} else {
			const data = await response.json();
			return data;
		}
	}
	/** Sends a GraphQL Query and returns the posts in a promise
	 * @param {queryVars | undefined} vars the graphQL variables
	 */
	async getPosts(): Promise< PrettyEventData[] | undefined > {
		try {
			const data = await this.makeRequest();
			return data;
		} catch ( err ) {
			console.error( err );
		}
		return undefined;
	}
}

export const model = new Model();
