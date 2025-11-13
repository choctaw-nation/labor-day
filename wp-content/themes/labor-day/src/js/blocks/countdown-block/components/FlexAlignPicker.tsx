import { Fragment, useState } from '@wordpress/element';
import {
	justifyBottom,
	justifyCenter,
	justifyCenterVertical,
	justifyLeft,
	justifyRight,
	justifySpaceBetween,
	justifySpaceBetweenVertical,
	justifyTop,
} from '@wordpress/icons';
import { Popover, Button, ToolbarButton } from '@wordpress/components';

const options = {
	horizontal: [
		{
			key: 'flex-start',
			name: 'Start',
			icon: justifyLeft,
		},
		{
			key: 'center',
			name: 'Center',
			icon: justifyCenter,
		},
		{
			key: 'flex-end',
			name: 'End',
			icon: justifyRight,
		},
		{
			key: 'space-between',
			name: 'Space Between',
			icon: justifySpaceBetween,
		},
	],
	vertical: [
		{
			key: 'flex-start',
			name: 'Start',
			icon: justifyTop,
		},
		{
			key: 'center',
			name: 'Center',
			icon: justifyCenterVertical,
		},
		{
			key: 'flex-end',
			name: 'End',
			icon: justifyBottom,
		},
		{
			key: 'space-between',
			name: 'Space Between',
			icon: justifySpaceBetweenVertical,
		},
	],
};

export default function FlexAlignPicker( {
	handleSelect,
	orientation,
	alignment,
} ) {
	const [ showFlexAlign, setShowFlexAlign ] = useState( false );
	const icon = options[ orientation ].find( ( opt ) => opt.key === alignment )
		?.icon;
	return (
		<Fragment>
			<ToolbarButton
				icon={ icon }
				label={ 'Set Countdown Spacing' }
				onClick={ () => setShowFlexAlign( ! showFlexAlign ) }
			/>
			{ showFlexAlign && (
				<Popover
					position="bottom center"
					onClose={ () => setShowFlexAlign( false ) }
				>
					<div style={ { padding: '1rem .5rem' } }>
						{ options[ orientation ].map( ( opt ) => (
							<Button
								style={ {
									display: 'flex',
									width: '100%',
									alignItems: 'center',
									gap: '.5rem',
								} }
								key={ opt.key }
								isPressed={ opt.key === alignment }
								onClick={ () => {
									handleSelect( opt.key );
									setShowFlexAlign( false );
								} }
								icon={ opt.icon }
								text={ opt.name }
								size="compact"
							/>
						) ) }
					</div>
				</Popover>
			) }
		</Fragment>
	);
}
