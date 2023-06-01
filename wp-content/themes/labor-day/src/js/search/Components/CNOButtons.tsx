import React, { useState, useEffect } from '@wordpress/element';
import Model from '../../add-to-schedule/model';
import View from '../../add-to-schedule/view';

export default function CNOButtons({
	eventId,
	link,
	canReadMore,
}): JSX.Element {
	return (
		<>
			<AddToScheduleButton eventId={eventId} />
			{canReadMore && (
				<a href={link} className="cno-event__buttons--learn-more">
					<i className="fa-solid fa-circle-info"></i>&nbsp;Learn More
				</a>
			)}
		</>
	);
}
function AddToScheduleButton({ eventId }) {
	const [responseMessage, setResponseMessage] = useState('Add to Schedule');
	useEffect(() => {
		const timeoutId = setTimeout(() => {
			setResponseMessage('In Schedule');
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
	return (
		<div
			className="cno-event__buttons--add-to-schedule"
			data-add-to-schedule="true"
			data-id={eventId}
			onClick={addToSchedule}
		>
			<i className="fa-solid fa-plus"></i>&nbsp;{responseMessage}
		</div>
	);
}
