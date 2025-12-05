import { Post, useEntityRecords } from '@wordpress/core-data';
import { RegistrationPage } from '../types';

export default function useRegistrationPages() {
	const { records, isResolving: isParentResolving } =
		useEntityRecords< Post >( 'postType', 'page', {
			slug: 'registrations',
			per_page: 1,
			_fields: 'id',
		} );
	const parentPageId = records?.length ? records[ 0 ].id : undefined;
	const { records: childRecords, isResolving: isChildrenResolving } =
		useEntityRecords< RegistrationPage >( 'postType', 'page', {
			per_page: 100,
			_fields: 'id,title,_embedded,_links,acf,excerpt',
			_embed: 'wp:featuredmedia',
			context: 'edit',
			order: 'asc',
			status: 'publish',
			orderby: 'title',
			parent: parentPageId,
		} );
	const registrationPages = childRecords;
	const isLoading = isParentResolving || isChildrenResolving;
	return { registrationPages, isLoading };
}
