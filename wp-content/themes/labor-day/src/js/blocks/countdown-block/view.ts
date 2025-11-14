import { CountdownHandler } from './_utils/CountdownHandler';

document.addEventListener( 'DOMContentLoaded', () => {
	const countdownBlocks = document.querySelectorAll< HTMLElement >(
		'.wp-block-cno-countdown-block'
	);

	countdownBlocks.forEach( ( block ) => {
		try {
			const handler = new CountdownHandler( block );
			handler.countdown();
		} catch ( err ) {
			// eslint-disable-next-line no-console
			console.error( err );
		}
	} );
} );
