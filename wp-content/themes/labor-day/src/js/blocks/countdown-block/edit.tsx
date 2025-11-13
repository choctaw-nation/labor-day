import { useBlockProps } from '@wordpress/block-editor';

import './editor.scss';
import { calculateTimeRemaining } from './_utils/calculateTimeRemaining';
import BlockSettings from './BlockSettings';
import CountdownPreview from './components/CountdownPreview';
import BlockToolbar from './BlockToolbar';

export default function Edit( props ) {
	const { attributes } = props;
	const {
		alignment,
		targetDate,
		completionMessage,
		numberColor,
		numberFontSize,
	} = attributes;

	const timeRemaining = calculateTimeRemaining( targetDate );

	const blockProps = useBlockProps( {
		style: {
			textAlign: alignment,
		},
	} );

	return (
		<>
			<BlockToolbar { ...props } />
			<BlockSettings { ...props } />
			<div { ...blockProps }>
				{ ! targetDate && (
					<div className="countdown-timer-placeholder">
						<p>
							{
								'Click the calendar icon in the toolbar to set a countdown date.'
							}
						</p>
					</div>
				) }
				{ timeRemaining && timeRemaining.isExpired && (
					<div
						className="countdown-timer-completion"
						style={ {
							fontSize: numberFontSize,
							color: numberColor,
						} }
					>
						{ completionMessage }
					</div>
				) }
				{ timeRemaining && ! timeRemaining.isExpired && (
					<CountdownPreview attributes={ attributes } />
				) }
			</div>
		</>
	);
}
