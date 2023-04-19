export default function EventDisplay({ schedule }) {
	function getTheDate(day) {
		let date = '';
		if ('Friday' === day) {
			date = 'September 1';
		} else if ('Saturday' === day) {
			date = 'September 2';
		} else {
			date = 'September 3';
		}
		return date;
	}

	function getTheTime(t) {
		const time = new Date(`2023-09-01T${t}`).toLocaleTimeString([], {
			hour: 'numeric',
			minute: '2-digit',
			hour12: true,
		});
		return time;
	}

	return schedule.map(
		({ title, link, start_time, day, end_time, description }) => {
			return (
				<div className="event-info">
					<h3 className="event-info__title">{title}</h3>
					<div className="event-info__meta">
						<span className="event-info__meta--start">
							Start Time: {`${getTheTime(start_time)}`}
						</span>
						{end_time && (
							<span className="event-info__meta--end">
								End Time:
								{`${getTheTime(end_time)}`}
							</span>
						)}
					</div>
					<p className="event-info__description ext-content">
						{description}
					</p>
					<a href={link} className="btn__outline--primary">
						View Event
					</a>
				</div>
			);
		},
	);
}
