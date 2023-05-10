import React from '@wordpress/element';
import { PrettyEventData } from '../types';
import CNOButtons from '../Components/CNOButtons';
import FeaturedImage from './FeaturedImage';

export default function SinglePost( { data }: { data: PrettyEventData } ) {
	const { locations, eventId, link, title, event_info, featuredImage, type } =
		data;
	if ( ! featuredImage ) {
	}
	function setDate( day: string ): string {
		let date: string = '';
		switch ( day ) {
			case 'Friday':
				date = 'September 1';
				return date;
			case 'Saturday':
				date = 'September 2';
				return date;
			case 'Sunday':
				date = 'September 3';
				return date;
			default:
				date = '';
				return date;
		}
	}
	return (
		<article className="cno-event">
			{ featuredImage && (
				<FeaturedImage featuredImage={ featuredImage } />
			) }
			<h2>{ title }</h2>
			<aside className="event-meta">
				<div className="event-meta__day">
					<strong>When: </strong>
					{ event_info.info.day }, { setDate( event_info.info.day ) }
				</div>
				{ locations && locations.length > 0 && (
					<div className="event-meta__location">
						<strong>Where:</strong>{ ' ' }
						<a href={ locations![ 0 ].link } rel="tag">
							{ locations![ 0 ].name }
						</a>
					</div>
				) }
				<div className="event-meta__start-time">
					<strong>Start Time:</strong>
					{ ' ' + event_info.info.startTime }
				</div>
				{ event_info.info.endTime && (
					<div className="event-meta__end-time">
						<strong>End Time:</strong> { event_info.info.endTime }
					</div>
				) }
				<div className="event-meta__type">
					<strong>Event Type:</strong>{ ' ' }
					<a href="${type[0].link}" rel="tag">
						{ type[ 0 ].name }
					</a>
				</div>
			</aside>
			<div className="about">{ event_info.description }</div>
			<CNOButtons eventId={ eventId } link={ link } />
		</article>
	);
}
