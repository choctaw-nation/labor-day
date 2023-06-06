import React, { useState, useEffect } from '@wordpress/element';
import Model from '../../add-to-schedule/model';
import View from '../../add-to-schedule/view';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export function AddToScheduleButton({ eventId }) {
	const [responseMessage, setResponseMessage] = useState('Add to Schedule');
	const [inSchedule] = useState(function () {
		const sched = Object.values(Model.getSchedule()).flat();
		return sched.filter((event) => event.eventId === eventId);
	});
	useEffect(() => {
		if ('Add to Schedule' === responseMessage) return;
		const timeoutId = setTimeout(() => {
			setResponseMessage('View Schedule');
		}, 4000);
		return () => clearTimeout(timeoutId);
	}, [responseMessage]);
	async function addToSchedule(ev) {
		try {
			const response = await Model.addToSchedule(ev);
			const message = View.getResponseMessage(response);
			if ('' !== message) {
				setResponseMessage(message);
			} else setResponseMessage('');
		} catch (err) {
			console.error(err);
		}
	}
	// Render Logic
	if ('View Schedule' === responseMessage) {
		return (
			<div>
				<FontAwesomeIcon icon={['far', 'calendar']} />
				&nbsp;<a href="/my-schedule">{responseMessage}</a>
			</div>
		);
	} else if (inSchedule[0]?.eventId === eventId) {
		return (
			<div>
				<FontAwesomeIcon icon={['far', 'calendar']} />
				&nbsp;<a href="/my-schedule">In Schedule</a>
			</div>
		);
	} else
		return (
			<div
				className="cno-event__buttons--add-to-schedule"
				data-add-to-schedule="true"
				data-id={eventId}
				onClick={(ev) => {
					setResponseMessage('Adding to schedule...');
					addToSchedule(ev);
				}}
			>
				<FontAwesomeIcon icon={['fas', 'plus']} /> {responseMessage}
			</div>
		);
}
