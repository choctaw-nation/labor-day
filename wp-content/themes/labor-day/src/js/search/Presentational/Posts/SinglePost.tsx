// 3rd Party
import React from 'react';

// Types
import { PrettyEventData, EventInfo } from '../../types';

// Components
import FeaturedImage from './FeaturedImage';
import { LocationButton, ShareModalButton } from '../CNOButtons';

// Utilities
import { getTheDay } from '../../../my-schedule/calendarFunctions';
import TimeHandler from '../../Utilities/TimeHandler';

const time = new TimeHandler();

/** Handles extra classes on top of standard classes. */
function getTheClass( extendedClass: string | undefined ): string {
	return extendedClass
		? `${ extendedClass } cno-event row animate__animated animate__fadeIn`
		: 'cno-event row animate__animated animate__fadeIn';
}

export default function SinglePost( {
	data,
	extendedClass,
	children,
	dispatch,
}: {
	dispatch?: Function;
	data: PrettyEventData;
	children?: React.Element;
	triggerModal?: Function;
	extendedClass?: string;
} ) {
	const { info, featured_image } = data;

	return (
		<div className={ getTheClass( extendedClass ) }>
			<EventTimeBanner info={ info } />
			{ featured_image && (
				<FeaturedImage featuredImage={ featured_image } />
			) }
			<CNOEventInfo
				data={ data }
				dispatch={ dispatch }
				children={ children }
			/>
		</div>
	);
}

function EventTimeBanner( { info }: { info: EventInfo } ): React.Element {
	const asideClass: string =
		'Saturday' === info.day
			? `cno-event__time px-xl-0 col-xl-1 cno-event__time--${ info.day.toLowerCase() }`
			: `cno-event__time col-xl-1 cno-event__time--${ info.day.toLowerCase() }`;
	const month = 'Sunday' === info.day ? 'SEP' : 'AUG';
	return (
		<aside className={ asideClass }>
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

function CNOEventInfo( { data, dispatch, children } ) {
	const { locations, title, link, description } = data as PrettyEventData;
	return (
		<div className="cno-event__info col-xl-6 col-xxl-7">
			<h2
				className="cno-event__info--title headline"
				dangerouslySetInnerHTML={ { __html: title } }
			/>
			<p
				className="cno-event__info--description"
				dangerouslySetInnerHTML={ { __html: description } }
			/>
			<div className="cno-event__buttons mt-auto d-flex align-items-stretch gap-3 position-relative">
				{ locations && locations.length > 0 && (
					<LocationButton
						name={ locations[ 0 ].name }
						slug={ locations[ 0 ].slug }
					/>
				) }
				<ShareModalButton
					dispatch={ dispatch }
					title={ title }
					link={ link }
				/>
				{ children }
			</div>
		</div>
	);
}
