import React from '@wordpress/element';
import type { EventInfo } from '../utilities/types';
import { getTheDay } from '../utilities/calendarFunctions';
import TimeHandler from '../utilities/TimeHandler';
const time = new TimeHandler();

export default function EventTimeBanner( { info }: { info: EventInfo } ) {
	const month = getShortMonth( info.day );
	const bannerBg = {
		friday: 'bg-primary',
		saturday: 'bg-secondary',
		sunday: 'bg-primary-light',
	};
	const asideClass = [
		'col-xl-1',
		'd-flex',
		'flex-column',
		'justify-content-center',
		'align-items-stretch',
		'order-2',
		'order-xl-0',
		'lh-sm',
		'mb-0',
		'fw-bold',
		'text-center',
		'text-white',
		'flex-wrap',
	];
	asideClass.push( bannerBg[ info.day.toLowerCase() ] );
	return (
		<div className={ asideClass.join( ' ' ) }>
			<div className="d-flex flex-column align-items-center justify-content-start flex-wrap my-1 my-xl-0">
				<span className="fw-bold text-uppercase">{ month }</span>
				<span className="fw-bold text-uppercase fs-1">
					{ getTheDay( info.day ) }
				</span>
				<span className="fw-bold text-uppercase">
					{ info.day.toUpperCase() }
				</span>
			</div>
			<div
				className="fw-bold text-uppercase border-top border-1 border-white mt-xl-2 px-2 py-1 pt-xl-3 text-center"
				dangerouslySetInnerHTML={ {
					__html: time.handleTime( info ),
				} }
			/>
		</div>
	);
}

/** Gets the short month name. */
function getShortMonth( day: string ): string | null {
	const dates = window.cnoSiteData.laborDayDates;
	if ( dates[ day.toLowerCase() ] ) {
		return new Date( dates[ day.toLowerCase() ] ).toLocaleDateString(
			'en-US',
			{ month: 'short' }
		);
	}
	return null;
}
