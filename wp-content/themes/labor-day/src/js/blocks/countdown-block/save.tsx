import { useBlockProps } from '@wordpress/block-editor';
import parseSpacing from './_utils/parseSpacing';

export default function Save( { attributes } ) {
	const blockProps = useBlockProps.save( {
		'data-target-date': attributes.targetDate,
		'data-show-empty-labels': attributes.showEmptyLabels,
		'data-show-days': attributes.showDays,
		'data-show-hours': attributes.showHours,
		'data-show-minutes': attributes.showMinutes,
		'data-show-seconds': attributes.showSeconds,
		'data-completion-message': attributes.completionMessage,
		'data-number-color': attributes.numberColor,
		'data-label-color': attributes.labelColor,
		style: {
			'--orientation':
				'horizontal' === attributes.orientation ? 'row' : 'column',
			'--gap': parseSpacing( attributes?.style?.spacing ),
			'--justify': attributes.alignment,
			'--numberFontSize': `var(--wp--preset--font-size--${ attributes.numberFontSize })`,
			'--labelFontSize': `var(--wp--preset--font-size--${ attributes.labelFontSize })`,
			textAlign: attributes.textAlign,
		},
	} );

	return (
		<div { ...blockProps }>
			<div className="countdown-block__display" />
		</div>
	);
}
