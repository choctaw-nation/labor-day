/**
 * React hook that is used to mark the block wrapper element.
 * It provides all the necessary props like the class name.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-block-editor/#useblockprops
 */
import { useBlockProps } from '@wordpress/block-editor';

/**
 * The save function defines the way in which the different attributes should
 * be combined into the final markup, which is then serialized by the block
 * editor into `post_content`.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-edit-save/#save
 *
 * @return {Element} Element to render.
 */
export default function save( { attributes } ) {
	const {
		targetDate,
		showDays,
		showHours,
		showMinutes,
		showSeconds,
		labelDays,
		labelHours,
		labelMinutes,
		labelSeconds,
		completionMessage,
		numberColor,
		labelColor,
		numberFontSize,
		labelFontSize,
		alignment,
	} = attributes;

	const blockProps = useBlockProps.save( {
		'data-target-date': targetDate,
		'data-show-days': showDays,
		'data-show-hours': showHours,
		'data-show-minutes': showMinutes,
		'data-show-seconds': showSeconds,
		'data-label-days': labelDays,
		'data-label-hours': labelHours,
		'data-label-minutes': labelMinutes,
		'data-label-seconds': labelSeconds,
		'data-completion-message': completionMessage,
		'data-number-color': numberColor,
		'data-label-color': labelColor,
		'data-number-font-size': numberFontSize,
		'data-label-font-size': labelFontSize,
		style: {
			textAlign: alignment,
		},
	} );

	return (
		<div { ...blockProps }>
			<div className="countdown-timer-display">
				{ /* Placeholder content - will be replaced by JavaScript */ }
			</div>
		</div>
	);
}
