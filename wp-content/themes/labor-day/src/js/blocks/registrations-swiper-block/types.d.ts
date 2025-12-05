import { Attachment, Post } from '@wordpress/core-data';
export interface RegistrationPage extends Post {
	id: number;
	title: { rendered: string; raw: string; protected: boolean };
	excerpt: { rendered: string; raw: string; protected: boolean };
	_embedded: {
		'wp:featuredmedia': Array<
			Attachment< 'edit' > & { source_url_webp?: string }
		>;
	};
}
