import React from "@wordpress/element";
import { LaborDayEvent } from "../types";
import RemoveEventButton from "./RemoveEvent";
import { format } from "date-fns";

function getTheTime(t: string): string {
	const time = new Date(`2023-09-01T${t}`).toLocaleTimeString([], {
		hour: "numeric",
		minute: "2-digit",
		hour12: true,
	});
	return time;
}
function formatICalDateTime(date: Date): string {
	const dateString = format(date, "yyyyMMdd'T'HHmmss");
	return `${dateString}`;
}

export default function EventsDisplay({
	schedule,
	day,
	removeEvent,
}: {
	schedule: Array<LaborDayEvent>;
	removeEvent: CallableFunction;
	day: "Friday" | "Saturday" | "Sunday";
}) {
	function downloadICSFile(event: LaborDayEvent) {
		let start_date = "";
		switch (event.day) {
			case "Friday":
				start_date = "September 1, 2023";
				break;
			case "Saturday":
				start_date = "September 2, 2023";
				break;
			case "Sunday":
				start_date = "September 3, 2023";
				break;
			default:
				throw new Error("Could not set date!");
		}
		const startDateTime = formatICalDateTime(
			new Date(`${start_date} ${event.start_time}`),
		);

		let endDateTime = "";
		if (event.end_time) {
			endDateTime = formatICalDateTime(
				new Date(`${start_date} ${event.end_time}`),
			);
		} else {
			const defaultDuration = 60 * 60 * 1000; // 1 hour
			const startTime = new Date(
				`${start_date} ${event.start_time}`,
			).getTime();
			endDateTime = formatICalDateTime(
				new Date(startTime + defaultDuration),
			);
		}
		const filename = `${event.title}.ics`;
		const data = `BEGIN:VCALENDAR
VERSION:2.0
BEGIN:VEVENT
DTSTART:${startDateTime}
DTEND:${endDateTime}
SUMMARY:${event.title}
DESCRIPTION:${event.description}
LOCATION:${event.link}
END:VEVENT
END:VCALENDAR`;

		const blob = new Blob([data], { type: "text/calendar;charset=utf-8" });
		const link = document.createElement("a");
		link.href = URL.createObjectURL(blob);
		link.download = filename;
		document.body.appendChild(link);
		link.click();
		document.body.removeChild(link);
	}

	function handleClick(id: number) {
		const event = schedule.filter((event) => event.id === id);
		downloadICSFile(event[0]);
	}
	return (
		<>
			{schedule.map(
				({
					title,
					link,
					start_time,
					end_time,
					description,
					id,
				}: LaborDayEvent) => {
					return (
						<div className="my-schedule__event" key={id}>
							<RemoveEventButton
								removeEvent={removeEvent}
								id={id}
								day={day}
							/>
							<div className="my-schedule__event-meta">
								<div className="my-schedule__event-meta--start">
									<span className="my-schedule__event-meta--label">
										Start Time:
									</span>{" "}
									<span className="my-schedule__event-meta--info">{`${getTheTime(
										start_time,
									)}`}</span>
								</div>
								{end_time && (
									<div className="my-schedule__event-meta--end">
										<span className="my-schedule__event-meta--label">
											End Time:
										</span>{" "}
										<span className="my-schedule__event-meta--info">{`${getTheTime(
											end_time,
										)}`}</span>
									</div>
								)}
							</div>
							<div className="my-schedule__event-details">
								<h3 className="my-schedule__event-details--title">
									{title}
								</h3>
								<p className="my-schedule__event-details--description">
									{description}
								</p>
								<div className="my-schedule__buttons">
									<a
										href={link}
										className="btn__outline--primary">
										View Event
									</a>
									<button
										className="btn__outline--secondary"
										onClick={() => {
											handleClick(id);
										}}>
										Export to Calendar
									</button>
								</div>
							</div>
						</div>
					);
				},
			)}
		</>
	);
}
