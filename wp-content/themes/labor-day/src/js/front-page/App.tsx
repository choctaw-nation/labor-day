import '@styles/pages/front-page.scss';
import React, { useState, useEffect, createRoot } from '@wordpress/element';
import CountdownTimer from './Countdown';
import { initRegistrationSwiper } from './registrationSwiper';

window.addEventListener( 'DOMContentLoaded', initRegistrationSwiper );

function CountdownApp() {
	const [ remainingTime, setRemainingTime ] = useState< {
		days: string | number;
		hours: string | number;
		minutes: string | number;
		seconds: string | number;
	} >( {
		days: '-',
		hours: '-',
		minutes: '-',
		seconds: '-',
	} );

	useEffect( () => {
		const targetDate = new Date( window.cnoSiteData.laborDayDates.friday );

		const intervalId = setInterval( () => {
			const now = new Date();
			const timeDiff = targetDate.getTime() - now.getTime();

			if ( timeDiff <= 0 ) {
				clearInterval( intervalId );
				setRemainingTime( {
					days: 0,
					hours: 0,
					minutes: 0,
					seconds: 0,
				} );
			} else {
				const days = Math.floor( timeDiff / ( 1000 * 60 * 60 * 24 ) );
				const hours = Math.floor(
					( timeDiff % ( 1000 * 60 * 60 * 24 ) ) / ( 1000 * 60 * 60 )
				);
				const minutes = Math.floor(
					( timeDiff % ( 1000 * 60 * 60 ) ) / ( 1000 * 60 )
				);
				const seconds = Math.floor(
					( timeDiff % ( 1000 * 60 ) ) / 1000
				);
				setRemainingTime( { days, hours, minutes, seconds } );
			}
		}, 1000 );

		return () => clearInterval( intervalId );
	}, [] );

	if (
		Object.values( remainingTime ).every(
			( val ) => ( val as number ) <= 0
		)
	) {
		return null;
	}
	return <CountdownTimer remainingTime={ remainingTime } />;
}

createRoot( document.getElementById( 'countdown' )! ).render(
	<CountdownApp />
);
