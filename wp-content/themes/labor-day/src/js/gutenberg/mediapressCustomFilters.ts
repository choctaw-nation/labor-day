import { addFilter } from '@wordpress/hooks';
import excerptCheck from './mediapress-filters/excerptCheck';

const filters = {
	excerpt_is_valid: excerptCheck,
};

Object.entries( filters ).forEach( ( [ name, filter ] ) => {
	addFilter( `mediaPress.checklist.item`, `cno/${ name }`, filter );
} );
