import { useState, useEffect } from '@wordpress/element';

import { calculateTimeRemaining } from '../_utils/calculateTimeRemaining';
import CountdownUnit from './CountdownUnit';
import { TimeRemainingObject } from '../_utils/types';
import { padZero } from '../_utils/padZero';
import { unitCanShow } from '../_utils/unitCanShow';

export default function CountdownPreview( { attributes } ) {
	const { targetDate } = attributes;

	const units = [
		{ key: 'days', show: attributes.showDays, label: 'Days' },
		{
			key: 'hours',
			show: attributes.showHours,
			label: 'Hours',
		},
		{
			key: 'minutes',
			show: attributes.showMinutes,
			label: 'Minutes',
		},
		{
			key: 'seconds',
			show: attributes.showSeconds,
			label: 'Seconds',
		},
	] as { key: keyof TimeRemainingObject; show: boolean; label: string }[];

	const [ timeRemaining, setTimeRemaining ] = useState< TimeRemainingObject >(
		calculateTimeRemaining( targetDate )!
	);
	// Update countdown every second in the editor
	useEffect( () => {
		const timer = setInterval( () => {
			setTimeRemaining( calculateTimeRemaining( targetDate )! );
		}, 1000 );

		return () => clearInterval( timer );
	}, [ targetDate ] );

	return (
		<div className="countdown-block__display">
			{ units.map(
				( unit ) =>
					unit.show &&
					unitCanShow(
						timeRemaining,
						unit.key,
						attributes.showEmptyLabels
					) && (
						<CountdownUnit
							key={ unit.key }
							timeRemaining={ padZero(
								timeRemaining[ unit.key ] as number
							) }
							label={ unit.label }
							numberFontSize={ attributes.numberFontSize }
							labelFontSize={ attributes.labelFontSize }
							numberColor={ attributes.numberColor }
							labelColor={ attributes.labelColor }
						/>
					)
			) }
		</div>
	);
}
