import { registerBlockType } from '@wordpress/blocks';
import { RichText } from '@wordpress/block-editor';

import './style.scss';
import Edit from './edit';
import metadata from './block.json';
import { icon } from './icon';

registerBlockType( metadata.name, {
	icon,
	edit: Edit,
	save: ( { attributes } ) => (
		<RichText.Content tagName="h2" value={ attributes.sectionTitle } />
	),
} );
