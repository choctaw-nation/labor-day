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
import useFontSize from './hooks/useFontSize';

export default function BlockSettings( { attributes, setAttributes } ) {
	const {
		targetDate,
		showEmptyLabels,
		showDays,
		showHours,
		showMinutes,
		showSeconds,
		completionMessage,
		numberColor,
		labelColor,
	} = attributes;

	const colors = useSelect(
		( select ) => select( blockEditorStore ).getSettings().colors,
		[]
	);
	const { numberFontSize, labelFontSize, fontSizes } =
		useFontSize( attributes );

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
					<Flex gap={ 6 } direction={ 'column' }>
						<FlexBlock>
							<ToggleControl
								__nextHasNoMarginBottom
								label={ 'Show expired units' }
								checked={ showEmptyLabels }
								onChange={ ( value ) =>
									setAttributes( { showEmptyLabels: value } )
								}
								help={
									'Sets visibility of a unit when expired'
								}
							/>
						</FlexBlock>
						<FlexBlock>
							<ToggleControl
								__nextHasNoMarginBottom
								label={ 'Show Days' }
								checked={ showDays }
								onChange={ ( value ) =>
									setAttributes( { showDays: value } )
								}
							/>
						</FlexBlock>
						<FlexBlock>
							<ToggleControl
								__nextHasNoMarginBottom
								label={ 'Show Hours' }
								checked={ showHours }
								onChange={ ( value ) =>
									setAttributes( { showHours: value } )
								}
							/>
						</FlexBlock>
						<FlexBlock>
							<ToggleControl
								__nextHasNoMarginBottom
								label={ 'Show Minutes' }
								checked={ showMinutes }
								onChange={ ( value ) =>
									setAttributes( { showMinutes: value } )
								}
							/>
						</FlexBlock>
						<FlexBlock>
							<ToggleControl
								__nextHasNoMarginBottom
								label={ 'Show Seconds' }
								checked={ showSeconds }
								onChange={ ( value ) =>
									setAttributes( { showSeconds: value } )
								}
							/>
						</FlexBlock>
					</Flex>
				</PanelBody>
			</InspectorControls>
			<InspectorControls group="styles">
				<PanelBody title={ 'Typography' } initialOpen={ false }>
					<Flex gap={ 6 } direction={ 'column' }>
						<FlexBlock>
							<p>
								<strong>{ 'Number Font Size' }</strong>
							</p>
							<FontSizePicker
								__next40pxDefaultSize
								disableCustomFontSizes={ true }
								valueMode="slug"
								fontSizes={ fontSizes }
								value={ numberFontSize }
								onChange={ ( _, selectedItem ) => {
									setAttributes( {
										numberFontSize: selectedItem?.slug,
									} );
								} }
							/>
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
								onChange={ ( _, selectedItem ) =>
									setAttributes( {
										labelFontSize: selectedItem?.slug,
									} )
								}
							/>
						</FlexBlock>
					</Flex>
				</PanelBody>
				<PanelBody title={ 'Colors' } initialOpen={ false }>
					<Flex gap={ 6 } direction={ 'column' }>
						<FlexBlock>
							<p style={ { marginBlock: '1rem' } }>
								<strong>{ 'Number Color' }</strong>
							</p>
							<ColorPalette
								disableCustomColors={ true }
								colors={ colors }
								value={ numberColor }
								onChange={ ( value ) =>
									setAttributes( { numberColor: value } )
								}
							/>
						</FlexBlock>
						<FlexBlock>
							<p style={ { marginBlock: '1rem' } }>
								<strong>{ 'Label Color' }</strong>
							</p>
							<ColorPalette
								disableCustomColors={ true }
								colors={ colors }
								value={ labelColor }
								onChange={ ( value ) =>
									setAttributes( { labelColor: value } )
								}
							/>
						</FlexBlock>
					</Flex>
				</PanelBody>
			</InspectorControls>
		</Fragment>
	);
}
