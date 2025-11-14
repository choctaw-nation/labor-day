import { store as blockEditorStore } from '@wordpress/block-editor';
import { useSelect } from '@wordpress/data';
import { useState, useEffect } from '@wordpress/element';

export default function useFontSize( attributes ) {
	const fontSizes = useSelect(
		( select ) => select( blockEditorStore ).getSettings().fontSizes,
		[]
	);
	const [ numberFontSize, setNumberFontSize ] = useState( '1rem' );
	const [ labelFontSize, setLabelFontSize ] = useState( '1rem' );

	useEffect( () => {
		if ( ! fontSizes ) {
			return;
		}
		setNumberFontSize(
			fontSizes.find(
				( font ) => font.slug === attributes.numberFontSize
			).size
		);
	}, [ fontSizes, attributes.numberFontSize ] );

	useEffect( () => {
		if ( ! fontSizes ) {
			return;
		}
		setLabelFontSize(
			fontSizes.find( ( font ) => font.slug === attributes.labelFontSize )
				.size
		);
	}, [ fontSizes, attributes.labelFontSize ] );
	return { numberFontSize, labelFontSize, fontSizes };
}
