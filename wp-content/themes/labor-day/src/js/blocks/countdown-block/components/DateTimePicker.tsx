import { Fragment, useState } from '@wordpress/element';
import {
	ToolbarButton,
	Popover,
	DateTimePicker as WPDateTimePicker,
} from '@wordpress/components';
import { calendar } from '@wordpress/icons';

export default function DateTimePicker( { targetDate, setTargetDate } ) {
	const [ showDatePicker, setShowDatePicker ] = useState( false );
	return (
		<Fragment>
			<ToolbarButton
				icon={ calendar }
				label={ 'Set Target Date & Time' }
				onClick={ () => setShowDatePicker( ! showDatePicker ) }
			/>
			{ showDatePicker && (
				<Popover
					position="bottom center"
					onClose={ () => setShowDatePicker( false ) }
				>
					<div style={ { padding: '1rem' } }>
						<WPDateTimePicker
							currentDate={
								targetDate || new Date().toISOString()
							}
							onChange={ ( newDate ) => setTargetDate( newDate ) }
							is12Hour={ true }
						/>
					</div>
				</Popover>
			) }
		</Fragment>
	);
}
