import React from '@wordpress/element';
import type { EventInfo } from '../utilities/types';
import { getTheDay } from '../utilities/calendarFunctions';
import TimeHandler from '../utilities/TimeHandler';
const time = new TimeHandler();

export default function EventTimeBanner( { info }: { info: EventInfo } ) {
	const month = 'Sunday' === info.day ? 'SEP' : 'AUG';
	const bannerBg = {
		friday: 'bg-primary',
		saturday: 'bg-secondary',
		sunday: 'bg-primary-light',
	};
	const asideClass = [
		'cno-event__time',
		'px-xl-0',
		'col-xl-1',
		'mb-0',
		'fw-bold',
		'text-center',
		'text-white',
		'd-flex',
		'flex-column',
		'align-items-stretch',
		'flex-wrap',
		'lh-sm',
	];
	asideClass.push( bannerBg[ info.day.toLowerCase() ] );
	return (
		<aside className={ asideClass.join( ' ' ) }>
			<div className="cno-event__time--date">
				<span className="cno-event__time--month">{ month }</span>
				<span className="cno-event__time--day">
					{ getTheDay( info.day ) }
				</span>
				<span className="cno-event__time--day-of-week">
					{ info.day.toUpperCase() }
				</span>
			</div>
			<div
				className="cno-event__time--time"
				dangerouslySetInnerHTML={ {
					__html: time.handleTime( info ),
				} }
			/>
		</aside>
	);
}
