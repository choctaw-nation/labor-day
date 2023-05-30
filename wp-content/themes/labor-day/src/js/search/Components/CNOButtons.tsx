import React, { useState, useEffect } from '@wordpress/element';
import Model from '../../add-to-schedule/model';
import View from '../../add-to-schedule/view';

export default function CNOButtons({
	eventId,
	link,
	canReadMore,
}): JSX.Element {
	const [responseMessage, setResponseMessage] = useState('');
	useEffect(() => {
		const timeoutId = setTimeout(() => {
			setResponseMessage('');
		}, 7000);
		return () => clearTimeout(timeoutId);
	}, [responseMessage]);
	function addToSchedule(ev: Event) {
		setResponseMessage(
			`<div class="alert alert-secondary" role="alert"><span>Loading...</span></div>`
		);
		Model.addToSchedule(ev)
			.then((response: string) => {
				setResponseMessage(View.getResponseMessage(response));
			})
			.catch((err: any) => {
				console.error(err);
			});
	}
	return (
		<>
			<div
				className="cno-event__buttons--add-to-schedule"
				data-add-to-schedule="true"
				data-id={eventId}
				onClick={addToSchedule}
			>
				<i className="fa-solid fa-plus"></i>&nbsp;Add to Schedule
			</div>
			{canReadMore && (
				<a href={link} className="cno-event__buttons--learn-more">
					<i className="fa-solid fa-circle-info"></i>&nbsp;Learn More
				</a>
			)}
			<div
				className="cno-event-schedule-confirmation"
				dangerouslySetInnerHTML={{ __html: responseMessage }}
			/>
		</>
	);
}
