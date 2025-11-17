import { useBlockProps, InspectorControls } from '@wordpress/block-editor';
import { Spinner, PanelBody, ColorPalette, Tip } from '@wordpress/components';
import { Fragment } from '@wordpress/element';

import Swiper from './Swiper';
import './editor.scss';
import parseSpacing from '../_block-utils/parseSpacing';
import useRegistrationPages from './hooks/useRegistrationPages';
import useThemeColors from '../_block-utils/useThemeColors';

export default function Edit( { attributes, setAttributes } ) {
	const { style, swiperUIColors } = attributes;
	const { registrationPages, isLoading } = useRegistrationPages();
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
				{ isLoading && <Spinner /> }
				{ ! isLoading &&
				registrationPages &&
				registrationPages.length > 0 ? (
					<Swiper pages={ registrationPages } />
				) : (
					<div
						style={ {
							maxWidth: 'var(--wp--style--global--content-size)',
							marginInline: 'auto',
						} }
					>
						<Tip>
							<span
								style={ {
									fontSize:
										'var(--wp--preset--font-size--md)',
									fontWeight: '700',
								} }
							>
								No registration pages are published. Nothing to
								display.
							</span>{ ' ' }
							<br />
							If this is nested, be sure to remove any elements
							you don&apos;t want rendered on the front-end.
						</Tip>
					</div>
				) }
			</div>
		</Fragment>
	);
}
