import { useState, useEffect } from '@wordpress/element';

import { calculateTimeRemaining } from '../_utils/calculateTimeRemaining';

export default function CountdownPreview( { attributes } ) {
	const {
		targetDate,
		showDays,
		showHours,
		showMinutes,
		showSeconds,
		labelDays,
		labelHours,
		labelMinutes,
		labelColor,
		labelSeconds,
		labelFontSize,
		numberFontSize,
		numberColor,
	} = attributes;

	const [ timeRemaining, setTimeRemaining ] = useState(
		calculateTimeRemaining( targetDate )
	);
	// Update countdown every second in the editor
	useEffect( () => {
		const timer = setInterval( () => {
			setTimeRemaining( calculateTimeRemaining( targetDate ) );
		}, 1000 );

		return () => clearInterval( timer );
	}, [ targetDate ] );
	return (
		<div className="countdown-timer-display">
			{ showDays && (
				<div className="countdown-timer-unit">
					<div
						className="countdown-timer-number"
						style={ {
							fontSize: `${ numberFontSize }px`,
							color: numberColor,
						} }
					>
						{ String( timeRemaining.days ).padStart( 2, '0' ) }
					</div>
					<div
						className="countdown-timer-label"
						style={ {
							fontSize: `${ labelFontSize }px`,
							color: labelColor,
						} }
					>
						{ labelDays }
					</div>
				</div>
			) }
			{ showHours && (
				<div className="countdown-timer-unit">
					<div
						className="countdown-timer-number"
						style={ {
							fontSize: `${ numberFontSize }px`,
							color: numberColor,
						} }
					>
						{ String( timeRemaining.hours ).padStart( 2, '0' ) }
					</div>
					<div
						className="countdown-timer-label"
						style={ {
							fontSize: `${ labelFontSize }px`,
							color: labelColor,
						} }
					>
						{ labelHours }
					</div>
				</div>
			) }
			{ showMinutes && (
				<div className="countdown-timer-unit">
					<div
						className="countdown-timer-number"
						style={ {
							fontSize: `${ numberFontSize }px`,
							color: numberColor,
						} }
					>
						{ String( timeRemaining.minutes ).padStart( 2, '0' ) }
					</div>
					<div
						className="countdown-timer-label"
						style={ {
							fontSize: `${ labelFontSize }px`,
							color: labelColor,
						} }
					>
						{ labelMinutes }
					</div>
				</div>
			) }
			{ showSeconds && (
				<div className="countdown-timer-unit">
					<div
						className="countdown-timer-number"
						style={ {
							fontSize: `${ numberFontSize }px`,
							color: numberColor,
						} }
					>
						{ String( timeRemaining.seconds ).padStart( 2, '0' ) }
					</div>
					<div
						className="countdown-timer-label"
						style={ {
							fontSize: `${ labelFontSize }px`,
							color: labelColor,
						} }
					>
						{ labelSeconds }
					</div>
				</div>
			) }
		</div>
	);
}
