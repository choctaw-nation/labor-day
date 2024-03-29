import React, { useState, useEffect } from '@wordpress/element';
import {model} from '../../add-to-schedule/model';
import View from '../../add-to-schedule/view';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { PrettyEventData } from '../types';

export function AddToScheduleButton({ eventId }) {
	const [responseMessage, setResponseMessage] = useState('Add to Schedule');
	const [inSchedule] = useState(function () {
		const schedule = model.getSchedule();
		const sched: PrettyEventData[] = Object.values(schedule).flat();
		if (sched.length === 0) return;
		const filteredSched = sched.filter(
			(event) => event.eventId === eventId
		);
		if (filteredSched[0]) {
			return filteredSched[0].eventId === eventId;
		} else return false;
	});

	/** Updates Text On responseMessage change. */
	useEffect(() => {
		if ('Add to Schedule' === responseMessage) return;
		const timeoutId = setTimeout(() => {
			setResponseMessage('View Schedule');
			View.showScheduleButton();
		}, View.MESSAGE_TIMEOUT);
		return () => clearTimeout(timeoutId);
	}, [responseMessage]);

	/** Adds event to user's schedule and updates the responseMessage. */
	async function addToSchedule(ev) {
		try {
			const response = await model.addToSchedule(ev);
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
	} else if (inSchedule) {
		return (
			<div className="cno-event__buttons--add-to-schedule">
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
