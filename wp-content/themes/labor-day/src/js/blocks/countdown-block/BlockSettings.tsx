import {
	InspectorControls,
	store as blockEditorStore,
} from '@wordpress/block-editor';
import { useSelect } from '@wordpress/data';
import { Fragment } from '@wordpress/element';

import {
	PanelBody,
	ToggleControl,
	TextControl,
	Flex,
	FlexBlock,
	DateTimePicker,
	ColorPalette,
	FontSizePicker,
} from '@wordpress/components';

export default function BlockSettings( { attributes, setAttributes } ) {
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
	} = attributes;
	const canShowLabels = [
		showDays,
		showHours,
		showMinutes,
		showSeconds,
	].some( ( v ) => v === true );

	const { colors, fontSizes } = useSelect( ( select ) => {
		const settings = select( blockEditorStore ).getSettings();
		return { colors: settings.colors, fontSizes: settings.fontSizes };
	}, [] );
	return (
		<Fragment>
			<InspectorControls>
				<PanelBody title={ 'Target Date & Time' } initialOpen={ false }>
					<DateTimePicker
						dateOrder="dmy"
						currentDate={ targetDate || new Date().toISOString() }
						onChange={ ( newDate ) =>
							setAttributes( { targetDate: newDate } )
						}
						is12Hour={ true }
					/>
				</PanelBody>
				<PanelBody title="Completion Message">
					<TextControl
						__next40pxDefaultSize
						__nextHasNoMarginBottom
						value={ completionMessage }
						onChange={ ( value ) =>
							setAttributes( { completionMessage: value } )
						}
						help={
							'This message will be displayed when the countdown reaches zero.'
						}
					/>
				</PanelBody>
				<PanelBody title={ 'Labels' } initialOpen={ false }>
					<ToggleControl
						__nextHasNoMarginBottom
						label={ 'Show Days' }
						checked={ showDays }
						onChange={ ( value ) =>
							setAttributes( { showDays: value } )
						}
					/>
					{ showDays && (
						<TextControl
							__next40pxDefaultSize
							__nextHasNoMarginBottom
							label={ 'Days Label' }
							value={ labelDays }
							onChange={ ( value ) =>
								setAttributes( { labelDays: value } )
							}
						/>
					) }
					<ToggleControl
						__nextHasNoMarginBottom
						label={ 'Show Hours' }
						checked={ showHours }
						onChange={ ( value ) =>
							setAttributes( { showHours: value } )
						}
					/>
					{ showHours && (
						<TextControl
							__next40pxDefaultSize
							__nextHasNoMarginBottom
							label={ 'Hours Label' }
							value={ labelHours }
							onChange={ ( value ) =>
								setAttributes( { labelHours: value } )
							}
						/>
					) }
					<ToggleControl
						__nextHasNoMarginBottom
						label={ 'Show Minutes' }
						checked={ showMinutes }
						onChange={ ( value ) =>
							setAttributes( { showMinutes: value } )
						}
					/>
					{ showMinutes && (
						<TextControl
							__next40pxDefaultSize
							__nextHasNoMarginBottom
							label={ 'Minutes Label' }
							value={ labelMinutes }
							onChange={ ( value ) =>
								setAttributes( { labelMinutes: value } )
							}
						/>
					) }
					<ToggleControl
						__nextHasNoMarginBottom
						label={ 'Show Seconds' }
						checked={ showSeconds }
						onChange={ ( value ) =>
							setAttributes( { showSeconds: value } )
						}
					/>
					{ showSeconds && (
						<TextControl
							__next40pxDefaultSize
							__nextHasNoMarginBottom
							label={ 'Seconds Label' }
							value={ labelSeconds }
							onChange={ ( value ) =>
								setAttributes( { labelSeconds: value } )
							}
						/>
					) }
				</PanelBody>
			</InspectorControls>
			<InspectorControls group="styles">
				<PanelBody title={ 'Colors' } initialOpen={ false }>
					<div style={ { marginBottom: '16px' } }>
						<strong>{ 'Number Color' }</strong>
						<ColorPalette
							disableCustomColors={ true }
							colors={ colors }
							value={ numberColor }
							onChange={ ( value ) =>
								setAttributes( { numberColor: value } )
							}
						/>
					</div>
					<div>
						<strong>{ 'Label Color' }</strong>
						<ColorPalette
							disableCustomColors={ true }
							colors={ colors }
							value={ labelColor }
							onChange={ ( value ) =>
								setAttributes( { labelColor: value } )
							}
						/>
					</div>
				</PanelBody>
				<PanelBody title={ 'Typography' } initialOpen={ false }>
					<Flex gap={ 6 } direction={ 'column' }>
						<FlexBlock>
							<p>
								<strong>{ 'Number Font Size' }</strong>
								<FontSizePicker
									__next40pxDefaultSize
									disableCustomFontSizes={ true }
									valueMode="slug"
									fontSizes={ fontSizes }
									value={ numberFontSize }
									onChange={ ( value ) =>
										setAttributes( {
											numberFontSize: value,
										} )
									}
								/>
							</p>
						</FlexBlock>
						<FlexBlock>
							<p>
								<strong>{ 'Label Font Size' }</strong>
							</p>
							<FontSizePicker
								__next40pxDefaultSize
								disableCustomFontSizes={ true }
								valueMode="slug"
								fontSizes={ fontSizes }
								value={ labelFontSize }
								onChange={ ( value ) =>
									setAttributes( { labelFontSize: value } )
								}
							/>
						</FlexBlock>
					</Flex>
				</PanelBody>
			</InspectorControls>
		</Fragment>
	);
}
