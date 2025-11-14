import { useBlockProps } from '@wordpress/block-editor';

import './editor.scss';
import { calculateTimeRemaining } from './_utils/calculateTimeRemaining';
import BlockSettings from './BlockSettings';
import CountdownPreview from './components/CountdownPreview';
import BlockToolbar from './BlockToolbar';
import parseSpacing from './_utils/parseSpacing';

export default function Edit( props ) {
	const { attributes } = props;
	const { targetDate, completionMessage } = attributes;
	const timeRemaining = calculateTimeRemaining( targetDate );
	const blockProps = useBlockProps( {
		style: {
			textAlign: attributes.textAlign,
			'--orientation':
				'horizontal' === attributes.orientation ? 'row' : 'column',
			'--gap': parseSpacing( attributes?.style?.spacing ),
			'--justify': attributes.alignment,
			'--numberFontSize': `var(--wp--preset--font-size--${ attributes.numberFontSize })`,
			'--labelFontSize': `var(--wp--preset--font-size--${ attributes.labelFontSize })`,
		},
	} );
	return (
		<>
			<BlockToolbar { ...props } />
			<BlockSettings { ...props } />
			<div { ...blockProps }>
				{ ! targetDate && (
					<div className="countdown-block__placeholder">
						<p>
							Click the calendar icon in the toolbar to set a
							countdown date.
						</p>
					</div>
				) }

				{ timeRemaining && (
					<div className="countdown-block__display">
						{ timeRemaining.isExpired ? (
							<p
								className="countdown-block__completion"
								style={ {
									color: attributes.numberColor,
								} }
							>
								{ completionMessage }
							</p>
						) : (
							<CountdownPreview attributes={ attributes } />
						) }
					</div>
				) }
			</div>
		</>
	);
}
