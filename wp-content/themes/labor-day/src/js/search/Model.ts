import { rootUrl } from './Utilities/Utilities';
import { PrettyEventData } from './types';

class Model {
	async makeRequest(
		query: string | null = null
	): Promise< PrettyEventData[] > {
		const url = `${ rootUrl }/wp-json/cno/v1/events${
			query ? `?s=${ query }` : ''
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
}

export const model = new Model();
