// 3rd Party
import React from '@wordpress/element';

// Types
import { PrettyEventData, EventInfo } from '../../types';

// Components
import FeaturedImage from './FeaturedImage';
import { LocationButton, ShareModalButton } from '../CNOButtons';

// Utilities
import { getTheDay } from '../../../my-schedule/calendarFunctions';
import { createExcerpt } from '../../Utilities/Utilities';
import TimeHandler from '../../Utilities/TimeHandler';

const time = new TimeHandler();

/** Handles extra classes on top of standard classes. */
function getTheClass(extendedClass: string | undefined): string {
	return extendedClass
		? `${extendedClass} cno-event row animate__animated animate__fadeIn`
		: 'cno-event row animate__animated animate__fadeIn';
}

export default function SinglePost({
	data,
	extendedClass,
	children,
	dispatch,
}: {
	dispatch: Function;
	data: PrettyEventData;
	children?: JSX.Element;
	triggerModal?: Function;
	extendedClass?: string;
}) {
	const { event_info, featuredImage } = data;
	return (
		<article className={getTheClass(extendedClass)}>
			<EventTimeBanner event_info={event_info} />
			{featuredImage && <FeaturedImage featuredImage={featuredImage} />}
			<CNOEventInfo data={data} dispatch={dispatch} children={children} />
		</article>
	);
}

function EventTimeBanner({
	event_info: { info },
}: {
	event_info: EventInfo;
}): JSX.Element {
	return (
		<aside
			className={`cno-event__time col-lg-1 px-lg-0 cno-event__time--${info.day.toLowerCase()}`}
		>
			<div className="cno-event__time--date">
				<span className="cno-event__time--month">SEP</span>
				<span className="cno-event__time--day">
					{getTheDay(info.day)}
				</span>
				<span className="cno-event__time--day-of-week">
					{info.day.toUpperCase()}
				</span>
			</div>
			<div
				className="cno-event__time--time"
				dangerouslySetInnerHTML={{
					__html: time.handleTime(info),
				}}
			/>
		</aside>
	);
}

function EventContent({ title, description }) {
	return (
		<>
			<h2 className="cno-event__info--title headline">{title}</h2>
			<div
				className="cno-event__info--description"
				dangerouslySetInnerHTML={{
					__html: createExcerpt(description).excerpt,
				}}
			/>
		</>
	);
}

function CNOEventInfo({ data, dispatch, children }) {
	const { locations, title, event_info, link } = data;
	return (
		<div className="cno-event__info col-lg-7">
			<EventContent title={title} description={event_info.description} />
			<div className="cno-event__buttons">
				{locations && locations.length > 0 && (
					<LocationButton
						href={locations[0].uri}
						name={locations[0].name}
					/>
				)}
				<ShareModalButton
					dispatch={dispatch}
					title={title}
					link={link}
				/>
				{children}
				{}
			</div>
		</div>
	);
}
