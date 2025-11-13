/**
 * Retrieves the translation of text.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-i18n/
 */
import { __ } from '@wordpress/i18n';

/**
 * React hook that is used to mark the block wrapper element.
 * It provides all the necessary props like the class name.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-block-editor/#useblockprops
 */
import { 
	useBlockProps, 
	InspectorControls,
	BlockControls,
	AlignmentToolbar
} from '@wordpress/block-editor';

import {
	PanelBody,
	ToggleControl,
	TextControl,
	RangeControl,
	DateTimePicker,
	ToolbarButton,
	ColorPalette,
	Popover
} from '@wordpress/components';

import { useState, useEffect } from '@wordpress/element';
import { calendar } from '@wordpress/icons';

/**
 * Lets webpack process CSS, SASS or SCSS files referenced in JavaScript files.
 * Those files can contain any CSS code that gets applied to the editor.
 *
 * @see https://www.npmjs.com/package/@wordpress/scripts#using-css
 */
import './editor.scss';

/**
 * Calculate time remaining
 */
function calculateTimeRemaining( targetDate ) {
	if ( ! targetDate ) {
		return null;
	}

	const now = new Date().getTime();
	const target = new Date( targetDate ).getTime();
	const difference = target - now;

	if ( difference <= 0 ) {
		return {
			days: 0,
			hours: 0,
			minutes: 0,
			seconds: 0,
			isExpired: true
		};
	}

	const days = Math.floor( difference / ( 1000 * 60 * 60 * 24 ) );
	const hours = Math.floor( ( difference % ( 1000 * 60 * 60 * 24 ) ) / ( 1000 * 60 * 60 ) );
	const minutes = Math.floor( ( difference % ( 1000 * 60 * 60 ) ) / ( 1000 * 60 ) );
	const seconds = Math.floor( ( difference % ( 1000 * 60 ) ) / 1000 );

	return {
		days,
		hours,
		minutes,
		seconds,
		isExpired: false
	};
}

/**
 * The edit function describes the structure of your block in the context of the
 * editor. This represents what the editor will render when the block is used.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-edit-save/#edit
 *
 * @return {Element} Element to render.
 */
export default function Edit( { attributes, setAttributes } ) {
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
		alignment
	} = attributes;

	const [ timeRemaining, setTimeRemaining ] = useState( calculateTimeRemaining( targetDate ) );
	const [ showDatePicker, setShowDatePicker ] = useState( false );

	// Update countdown every second in the editor
	useEffect( () => {
		const timer = setInterval( () => {
			setTimeRemaining( calculateTimeRemaining( targetDate ) );
		}, 1000 );

		return () => clearInterval( timer );
	}, [ targetDate ] );

	const blockProps = useBlockProps( {
		style: {
			textAlign: alignment
		}
	} );

	const colors = [
		{ name: 'Black', color: '#000000' },
		{ name: 'White', color: '#ffffff' },
		{ name: 'Red', color: '#ff0000' },
		{ name: 'Green', color: '#00ff00' },
		{ name: 'Blue', color: '#0000ff' },
		{ name: 'Gray', color: '#666666' },
	];

	return (
		<>
			<BlockControls>
				<AlignmentToolbar
					value={ alignment }
					onChange={ ( newAlignment ) => setAttributes( { alignment: newAlignment } ) }
				/>
				<ToolbarButton
					icon={ calendar }
					label={ __( 'Set Date & Time', 'countdown-timer' ) }
					onClick={ () => setShowDatePicker( ! showDatePicker ) }
				/>
				{ showDatePicker && (
					<Popover
						position="bottom center"
						onClose={ () => setShowDatePicker( false ) }
					>
						<div style={ { padding: '16px' } }>
							<DateTimePicker
								currentDate={ targetDate || new Date().toISOString() }
								onChange={ ( newDate ) => setAttributes( { targetDate: newDate } ) }
								is12Hour={ true }
							/>
						</div>
					</Popover>
				) }
			</BlockControls>

			<InspectorControls>
				<PanelBody title={ __( 'Countdown Settings', 'countdown-timer' ) }>
					<div style={ { marginBottom: '16px' } }>
						<strong>{ __( 'Target Date & Time', 'countdown-timer' ) }</strong>
						<DateTimePicker
							currentDate={ targetDate || new Date().toISOString() }
							onChange={ ( newDate ) => setAttributes( { targetDate: newDate } ) }
							is12Hour={ true }
						/>
					</div>
				</PanelBody>

				<PanelBody title={ __( 'Display Units', 'countdown-timer' ) }>
					<ToggleControl
						label={ __( 'Show Days', 'countdown-timer' ) }
						checked={ showDays }
						onChange={ ( value ) => setAttributes( { showDays: value } ) }
					/>
					<ToggleControl
						label={ __( 'Show Hours', 'countdown-timer' ) }
						checked={ showHours }
						onChange={ ( value ) => setAttributes( { showHours: value } ) }
					/>
					<ToggleControl
						label={ __( 'Show Minutes', 'countdown-timer' ) }
						checked={ showMinutes }
						onChange={ ( value ) => setAttributes( { showMinutes: value } ) }
					/>
					<ToggleControl
						label={ __( 'Show Seconds', 'countdown-timer' ) }
						checked={ showSeconds }
						onChange={ ( value ) => setAttributes( { showSeconds: value } ) }
					/>
				</PanelBody>

				<PanelBody title={ __( 'Labels', 'countdown-timer' ) } initialOpen={ false }>
					<TextControl
						label={ __( 'Days Label', 'countdown-timer' ) }
						value={ labelDays }
						onChange={ ( value ) => setAttributes( { labelDays: value } ) }
					/>
					<TextControl
						label={ __( 'Hours Label', 'countdown-timer' ) }
						value={ labelHours }
						onChange={ ( value ) => setAttributes( { labelHours: value } ) }
					/>
					<TextControl
						label={ __( 'Minutes Label', 'countdown-timer' ) }
						value={ labelMinutes }
						onChange={ ( value ) => setAttributes( { labelMinutes: value } ) }
					/>
					<TextControl
						label={ __( 'Seconds Label', 'countdown-timer' ) }
						value={ labelSeconds }
						onChange={ ( value ) => setAttributes( { labelSeconds: value } ) }
					/>
				</PanelBody>

				<PanelBody title={ __( 'Completion Message', 'countdown-timer' ) } initialOpen={ false }>
					<TextControl
						label={ __( 'Message', 'countdown-timer' ) }
						value={ completionMessage }
						onChange={ ( value ) => setAttributes( { completionMessage: value } ) }
						help={ __( 'This message will be displayed when the countdown reaches zero.', 'countdown-timer' ) }
					/>
				</PanelBody>

				<PanelBody title={ __( 'Typography', 'countdown-timer' ) } initialOpen={ false }>
					<RangeControl
						label={ __( 'Number Font Size', 'countdown-timer' ) }
						value={ numberFontSize }
						onChange={ ( value ) => setAttributes( { numberFontSize: value } ) }
						min={ 16 }
						max={ 120 }
					/>
					<RangeControl
						label={ __( 'Label Font Size', 'countdown-timer' ) }
						value={ labelFontSize }
						onChange={ ( value ) => setAttributes( { labelFontSize: value } ) }
						min={ 10 }
						max={ 32 }
					/>
				</PanelBody>

				<PanelBody title={ __( 'Colors', 'countdown-timer' ) } initialOpen={ false }>
					<div style={ { marginBottom: '16px' } }>
						<strong>{ __( 'Number Color', 'countdown-timer' ) }</strong>
						<ColorPalette
							colors={ colors }
							value={ numberColor }
							onChange={ ( value ) => setAttributes( { numberColor: value } ) }
						/>
					</div>
					<div>
						<strong>{ __( 'Label Color', 'countdown-timer' ) }</strong>
						<ColorPalette
							colors={ colors }
							value={ labelColor }
							onChange={ ( value ) => setAttributes( { labelColor: value } ) }
						/>
					</div>
				</PanelBody>
			</InspectorControls>

			<div { ...blockProps }>
				{ ! targetDate ? (
					<div className="countdown-timer-placeholder">
						<p>{ __( 'Click the calendar icon in the toolbar to set a countdown date.', 'countdown-timer' ) }</p>
					</div>
				) : timeRemaining && timeRemaining.isExpired ? (
					<div 
						className="countdown-timer-completion"
						style={ {
							fontSize: `${ numberFontSize }px`,
							color: numberColor
						} }
					>
						{ completionMessage }
					</div>
				) : timeRemaining ? (
					<div className="countdown-timer-display">
						{ showDays && (
							<div className="countdown-timer-unit">
								<div 
									className="countdown-timer-number"
									style={ {
										fontSize: `${ numberFontSize }px`,
										color: numberColor
									} }
								>
									{ String( timeRemaining.days ).padStart( 2, '0' ) }
								</div>
								<div 
									className="countdown-timer-label"
									style={ {
										fontSize: `${ labelFontSize }px`,
										color: labelColor
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
										color: numberColor
									} }
								>
									{ String( timeRemaining.hours ).padStart( 2, '0' ) }
								</div>
								<div 
									className="countdown-timer-label"
									style={ {
										fontSize: `${ labelFontSize }px`,
										color: labelColor
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
										color: numberColor
									} }
								>
									{ String( timeRemaining.minutes ).padStart( 2, '0' ) }
								</div>
								<div 
									className="countdown-timer-label"
									style={ {
										fontSize: `${ labelFontSize }px`,
										color: labelColor
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
										color: numberColor
									} }
								>
									{ String( timeRemaining.seconds ).padStart( 2, '0' ) }
								</div>
								<div 
									className="countdown-timer-label"
									style={ {
										fontSize: `${ labelFontSize }px`,
										color: labelColor
									} }
								>
									{ labelSeconds }
								</div>
							</div>
						) }
					</div>
				) : null }
			</div>
		</>
	);
}
