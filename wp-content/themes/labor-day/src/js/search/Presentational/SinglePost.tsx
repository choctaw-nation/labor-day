import React from '@wordpress/element';
import { PrettyEventData } from '../types';
import FeaturedImage from './FeaturedImage';
import { getTheDay } from '../../my-schedule/calendarFunctions';
import { createExcerpt, TimeHandler } from '../Utilities';

const time = new TimeHandler();
export default function SinglePost({
	data,
	children,
	setShowShareModal,
	setShareEventObject,
	extendedClass,
}: {
	data: PrettyEventData;
	children?: JSX.Element;
	setShowShareModal?: Function;
	setShareEventObject?: Function;
	extendedClass?: string;
}) {
	const { locations, title, event_info, featuredImage, link } = data;
	return (
		<article
			className={
				extendedClass
					? `${extendedClass} cno-event row animate__animated animate__fadeIn`
					: 'cno-event row animate__animated animate__fadeIn'
			}
		>
			<aside
				className={`cno-event__time col-lg-1 px-lg-0 cno-event__time--${event_info.info.day.toLowerCase()}`}
			>
				<div className="cno-event__time--date">
					<span className="cno-event__time--month">SEP</span>
					<span className="cno-event__time--day">
						{getTheDay(event_info.info.day)}
					</span>
					<span className="cno-event__time--day-of-week">
						{event_info.info.day.toUpperCase()}
					</span>
				</div>
				<div
					className="cno-event__time--time"
					dangerouslySetInnerHTML={{
						__html: time.handleTime(event_info.info),
					}}
				/>
			</aside>
			{featuredImage && <FeaturedImage featuredImage={featuredImage} />}
			<div className="cno-event__info col-lg-7">
				<h2 className="cno-event__info--title headline">{title}</h2>
				<div
					className="cno-event__info--description"
					dangerouslySetInnerHTML={{
						__html: createExcerpt(event_info.description).excerpt,
					}}
				/>

				<div className="cno-event__buttons">
					{locations && locations.length > 0 && (
						<a
							className="cno-event__buttons--location"
							href={locations![0].uri}
						>
							<i className="fa-solid fa-location-dot" />
							&nbsp;
							{locations![0].name}
						</a>
					)}
					<div
						className="cno-event__buttons--share"
						onClick={(ev) => {
							ev.preventDefault();
							setShowShareModal(true);
							setShareEventObject({
								title: title,
								link: link,
							});
						}}
					>
						<i className="fa-solid fa-share" />
						&nbsp;Share
					</div>
					{children}
				</div>
			</div>
		</article>
	);
}
