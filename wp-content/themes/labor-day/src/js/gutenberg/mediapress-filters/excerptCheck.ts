
import { select } from '@wordpress/data';
import { store as editorStore } from '@wordpress/editor';
import type { ChecklistItem } from './types';

/**
 * Checks if the excerpt is valid
 * @param item
 */
export default function excerptCheck( item: ChecklistItem ): ChecklistItem {
	if ( item.name !== 'excerpt_is_valid' ) {
		return item;
	}
	const isCurrentPostPending = select( editorStore ).isCurrentPostPending();
	const excerpt = select( editorStore ).getEditedPostAttribute( 'excerpt' );
	if ( ! excerpt || excerpt.length === 0 ) {
		return {
			...item,
			status: isCurrentPostPending ? 'NONBLOCKING' : 'BLOCKING',
			message: 'Please provide a valid excerpt for the post.',
		};
	}
	if ( excerpt.length > 160 ) {
		return {
			...item,
			status: isCurrentPostPending ? 'NONBLOCKING' : 'BLOCKING',
			message: 'Excerpt must be 160 characters or less.',
		};
	}
	if ( excerpt.length < 120 ) {
		return {
			...item,
			status: isCurrentPostPending ? 'NONBLOCKING' : 'BLOCKING',
			message: 'Excerpt must be at least 120 characters.',
		};
	}

	return {
		...item,
		status: 'COMPLETED',
		message: 'A valid excerpt is provided.',
	};
}
