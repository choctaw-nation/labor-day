import React from '@wordpress/element';
import { PrettyEventData } from '../types';
import CNOButtons from '../Components/CNOButtons';
import FeaturedImage from './FeaturedImage';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLocationDot } from '@fortawesome/free-solid-svg-icons';

export default function SinglePost( { data }: { data: PrettyEventData } ) {
	const { locations, eventId, link, title, event_info, featuredImage, type } =
		data;
	if ( ! featuredImage ) {
	}
	function setDate( day: string ): string {
		let date: string = '';
		switch ( day ) {
			case 'Friday':
				date = '1';
				return date;
			case 'Saturday':
				date = '2';
				return date;
			case 'Sunday':
				date = '3';
				return date;
			default:
				date = '';
				return date;
		}
	}
	return (
		<article className="cno-event row">
			<aside
				className={ `cno-event__time col-lg-1 cno-event__time--${ event_info.info.day.toLowerCase() }` }
			>
				<div className="cno-event__time--date">
					<span className="cno-event__time--month">SEP</span>
					<span className="cno-event__time--day">
						{ setDate( event_info.info.day ) }
					</span>
					<span className="cno-event__time--day-of-week">
						{ event_info.info.day.toUpperCase() }
					</span>
				</div>
				<div className="cno-event__time--time">
					{ event_info.info.startTime }
				</div>
			</aside>
			{ featuredImage && (
				<div className="cno-event__time col-lg-3">
					<FeaturedImage featuredImage={ featuredImage } />
				</div>
			) }
			<div className="cno-event__info col-lg-8">
				<h2 className="cno-event__info--title headline">{ title }</h2>
				<div className="cno-event__meta">
					{ locations && locations.length > 0 && (
						<div className="cno-event__meta--location">
							<FontAwesomeIcon
								icon={ faLocationDot }
								className="cno-event__meta--icon"
							/>
							<a
								href={ locations![ 0 ].link }
								className="cno-event__meta--link"
								rel="tag"
							>
								{ locations![ 0 ].name }
							</a>
						</div>
					) }
				</div>
				<div className="cno-event__info--description">
					{ event_info.description }
				</div>
				<CNOButtons eventId={ eventId } link={ link } />
			</div>
		</article>
	);
}
