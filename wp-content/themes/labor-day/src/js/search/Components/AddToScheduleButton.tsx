import React, { useState, useEffect } from '@wordpress/element';
import Model from '../../add-to-schedule/model';
import View from '../../add-to-schedule/view';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export function AddToScheduleButton({ eventId }) {
	const [responseMessage, setResponseMessage] = useState('Add to Schedule');
	useEffect(() => {
		const timeoutId = setTimeout(() => {
			setResponseMessage('View Schedule');
		}, 7000);
		return () => clearTimeout(timeoutId);
	}, [responseMessage]);
	function addToSchedule(ev: Event) {
		setResponseMessage(`Loading...`);
		Model.addToSchedule(ev)
			.then((response: string) => {
				setResponseMessage(View.getResponseMessage(response));
			})
			.catch((err: any) => {
				console.error(err);
			});
	}
	if ('View Schedule' === responseMessage) {
		return (
			<div>
				<FontAwesomeIcon icon={['far', 'calendar']} />
				<a href="/my-schedule"> {responseMessage}</a>
			</div>
		);
	} else
		return (
			<div
				className="cno-event__buttons--add-to-schedule"
				data-add-to-schedule="true"
				data-id={eventId}
				onClick={addToSchedule}
			>
				<FontAwesomeIcon icon={['fas', 'plus']} /> {responseMessage}
			</div>
		);
}
