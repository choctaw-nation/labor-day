import React, { useState, useEffect } from '@wordpress/element';
import Model from '../../add-to-schedule/model';

export default function CNOButtons( { eventId, link } ) {
	const [ responseMessage, setResponseMessage ] = useState( '' );
	useEffect( () => {
		const timeoutId = setTimeout( () => {
			setResponseMessage( '' );
		}, 7000 );
		return () => clearTimeout( timeoutId );
	}, [ responseMessage ] );
	function addToSchedule( ev: Event ) {
		Model.addToSchedule( ev )
			.then( ( response: string ) => {
				let message = '';
				if ( 'success' === response ) {
					message = `Added to your schedule!`;
				}
				if ( 'info' === response ) {
					message = `This is already in your schedule.`;
				}
				setResponseMessage( `<div class="alert alert-${ response }" role="alert">
					${ message }
				</div>` );
			} )
			.catch( ( err: any ) => {
				console.error( err );
			} );
	}
	return (
		<>
			<button
				className="btn__fill--primary"
				data-add-to-schedule="true"
				data-id={ eventId }
				onClick={ addToSchedule }
			>
				Add to Schedule
			</button>
			<a href={ link } className="btn__outline--primary">
				Learn More
			</a>
			<div
				className="cno-event-schedule-confirmation"
				dangerouslySetInnerHTML={ { __html: responseMessage } }
			/>
		</>
	);
}
