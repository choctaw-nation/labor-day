import React from '@wordpress/element';
import { PrettyEventData } from '../types';
import FeaturedImage from './FeaturedImage';
import { getTheDay } from '../../my-schedule/calendarFunctions';
import { createExcerpt } from '../Utilities';

export default function SinglePost({
	data,
	children,
	setShowShareModal,
	setShareEventObject,
}: {
	data: PrettyEventData;
	children?: JSX.Element;
	setShowShareModal: Function;
	setShareEventObject: Function;
}) {
	const { locations, title, event_info, featuredImage, link } = data;

	return (
		<article className="cno-event row animate__animated animate__fadeIn">
			<aside
				className={`cno-event__time col-lg-1 cno-event__time--${event_info.info.day.toLowerCase()}`}
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
				<div className="cno-event__time--time">
					{event_info.info.startTime}
				</div>
			</aside>
			{featuredImage && (
				<div className="cno-event__image col-lg-3">
					<FeaturedImage featuredImage={featuredImage} />
				</div>
			)}
			<div className="cno-event__info col-lg-8">
				<h2 className="cno-event__info--title headline">{title}</h2>
				<div
					className="cno-event__info--description"
					dangerouslySetInnerHTML={{
						__html: createExcerpt(event_info.description).excerpt,
					}}
				/>

				<div className="cno-event__buttons">
					{locations && locations.length > 0 && (
						<div className="cno-event__meta--location">
							<div className="cno-event__meta--icon">
								<i className="fa-solid fa-location-dot" />
							</div>

							<a
								href={locations![0].uri}
								className="cno-event__meta--link"
								rel="tag"
							>
								{locations![0].name}
							</a>
						</div>
					)}
					<a
						className="cno-event__meta--share"
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
					</a>
					{children}
				</div>
			</div>
		</article>
	);
}
