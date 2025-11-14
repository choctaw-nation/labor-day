import { BlockControls, AlignmentToolbar } from '@wordpress/block-editor';

import OrientationPicker from './components/OrientationPicker';
import DateTimePicker from './components/DateTimePicker';
import FlexAlignPicker from './components/FlexAlignPicker';

export default function BlockToolbar( { attributes, setAttributes } ) {
	const { alignment, textAlign, orientation, targetDate } = attributes;

	return (
		<BlockControls>
			<AlignmentToolbar
				value={ textAlign }
				onChange={ ( textAlign ) => setAttributes( { textAlign } ) }
			/>
			<OrientationPicker
				orientation={ orientation }
				handleSelect={ ( orientation ) => {
					setAttributes( { orientation } );
				} }
			/>
			<FlexAlignPicker
				orientation={ orientation }
				alignment={ alignment }
				handleSelect={ ( alignment ) => setAttributes( { alignment } ) }
			/>
			<DateTimePicker
				targetDate={ targetDate }
				setTargetDate={ ( targetDate ) =>
					setAttributes( { targetDate } )
				}
			/>
		</BlockControls>
	);
}
