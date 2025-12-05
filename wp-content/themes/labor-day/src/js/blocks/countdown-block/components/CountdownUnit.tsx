export interface CountdownUnitProps {
	timeRemaining: string;
	label: string;
	numberFontSize: string;
	labelFontSize: string;
	numberColor: string;
	labelColor: string;
}
export default function CountdownUnit( props: CountdownUnitProps ) {
	const {
		timeRemaining,
		label: unitLabel,
		numberFontSize,
		labelFontSize,
		numberColor,
		labelColor,
	} = props;
	const label =
		'seconds' !== unitLabel && '01' === timeRemaining
			? unitLabel.slice( 0, -1 )
			: unitLabel;
	return (
		<div className="countdown-block__unit">
			<p
				className="countdown-block__number"
				style={ {
					margin: 0,
					fontSize: `var(--wp--preset--font-size--${ numberFontSize })`,
					color: numberColor,
				} }
			>
				{ timeRemaining }
			</p>
			<p
				className="countdown-block__label"
				style={ {
					margin: 0,
					fontSize: `var(--wp--preset--font-size--${ labelFontSize })`,
					color: labelColor,
				} }
			>
				{ label }
			</p>
		</div>
	);
}
