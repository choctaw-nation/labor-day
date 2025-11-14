import { Fragment, useState } from '@wordpress/element';
import {
	arrowDown,
	arrowRight,
	justifyCenter,
	justifyCenterVertical,
} from '@wordpress/icons';
import { Popover, Button, ToolbarButton } from '@wordpress/components';

const options = [
	{
		key: 'horizontal',
		name: 'Horizontal',
		icon: justifyCenter,
	},
	{
		key: 'vertical',
		name: 'Vertical',
		icon: justifyCenterVertical,
	},
];

export default function OrientationPicker( { handleSelect, orientation } ) {
	const [ showOrientationPicker, setShowOrientationPicker ] =
		useState( false );
	const toolbarIcon = 'horizontal' === orientation ? arrowRight : arrowDown;
	return (
		<Fragment>
			<ToolbarButton
				icon={ toolbarIcon }
				label={ 'Set Countdown Orientation' }
				onClick={ () =>
					setShowOrientationPicker( ! showOrientationPicker )
				}
			/>
			{ showOrientationPicker && (
				<Popover
					position="bottom center"
					onClose={ () => setShowOrientationPicker( false ) }
				>
					<div style={ { padding: '1rem .5rem' } }>
						{ options.map( ( opt ) => (
							<Button
								style={ {
									display: 'flex',
									alignItems: 'center',
									gap: '.5rem',
								} }
								key={ opt.key }
								isPressed={ opt.key === orientation }
								onClick={ () => {
									handleSelect( opt.key );
									setShowOrientationPicker( false );
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
