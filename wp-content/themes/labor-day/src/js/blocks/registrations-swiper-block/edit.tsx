import { useBlockProps, InspectorControls } from '@wordpress/block-editor';
import { Spinner, PanelBody, ColorPalette } from '@wordpress/components';
import { Fragment } from '@wordpress/element';

import Swiper from './Swiper';
import './editor.scss';
import parseSpacing from '../_block-utils/parseSpacing';
import useRegistrationPages from './hooks/useRegistrationPages';
import useThemeColors from '../_block-utils/useThemeColors';

export default function Edit( { attributes, setAttributes } ) {
	const { style, swiperUIColors } = attributes;
	const { registrationPages } = useRegistrationPages();
	const { themeColors } = useThemeColors();
	const blockGap = parseSpacing( style.spacing );
	const blockProps = useBlockProps( {
		style: {
			'--gap': blockGap,
			'--swiper-pagination-color': swiperUIColors,
			'--swiper-navigation-color': swiperUIColors,
		},
	} );
	return (
		<Fragment>
			<InspectorControls group="styles">
				<PanelBody title="Swiper UI Controls" initialOpen={ true }>
					<ColorPalette
						value={ swiperUIColors }
						onChange={ ( color ) => {
							setAttributes( { swiperUIColors: color } );
						} }
						disableCustomColors={ true }
						colors={ themeColors }
					/>
				</PanelBody>
			</InspectorControls>
			<div { ...blockProps }>
				{ ! registrationPages && <Spinner /> }
				{ registrationPages && registrationPages.length > 0 && (
					<Swiper pages={ registrationPages } />
				) }
			</div>
		</Fragment>
	);
}
