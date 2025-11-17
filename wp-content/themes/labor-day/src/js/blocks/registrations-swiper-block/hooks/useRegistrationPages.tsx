import { useSelect } from '@wordpress/data';
import { store as coreDataStore, Post } from '@wordpress/core-data';
import { RegistrationPage } from '../types';

export default function useRegistrationPages() {
	const registrationPages = useSelect( ( select ) => {
		const maybeRegistrationPage = select( coreDataStore ).getEntityRecords(
			'postType',
			'page',
			{
				slug: 'registrations',
				per_page: 1,
				_fields: 'id',
			}
		) as Post[] | null;
		if ( ! maybeRegistrationPage ) {
			return [];
		}
		const registrationsPage = maybeRegistrationPage[ 0 ].id;
		return select( coreDataStore ).getEntityRecords( 'postType', 'page', {
			parent: registrationsPage,
			per_page: 100,
			_fields: 'id,title,_embedded,_links,acf,excerpt',
			_embed: 'wp:featuredmedia',
			context: 'edit',
			order: 'asc',
			status: 'publish',
			orderby: 'title',
		} );
	}, [] ) as RegistrationPage[] | null;
	return { registrationPages };
}
