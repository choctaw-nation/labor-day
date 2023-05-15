import React, { useState, useEffect } from '@wordpress/element';
import Model from '../../add-to-schedule/model';
import View from '../../add-to-schedule/view';

export default function CNOButtons( {
	eventId,
	link,
	canReadMore,
} ): JSX.Element {
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
				setResponseMessage( View.getResponseMessage( response ) );
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
			{ canReadMore && (
				<a href={ link } className="btn__outline--primary">
					Learn More
				</a>
			) }
			<div
				className="cno-event-schedule-confirmation"
				dangerouslySetInnerHTML={ { __html: responseMessage } }
			/>
		</>
	);
}
