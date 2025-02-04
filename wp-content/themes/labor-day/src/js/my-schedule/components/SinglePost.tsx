// 3rd Party
import React from 'react';

// Types
import { PrettyEventData, EventInfo } from '../utilities/types';

// Components
import FeaturedImage from './FeaturedImage';
import { LocationButton, ShareModalButton } from '../ui/CNOButtons';

// Utilities
import { getTheDay } from '../utilities/calendarFunctions';
import TimeHandler from '../utilities/TimeHandler';

const time = new TimeHandler();

/** Handles extra classes on top of standard classes. */
function getTheClass( extendedClass: string | undefined ): string {
	const defaultClasses = [
		'cno-event',
		'row',
		'gx-0',
		'gap-lg-3',
		'animate__animated',
		'animate__fadeIn',
	];
	return extendedClass
		? `${ extendedClass } ${ defaultClasses.join( ' ' ) }`
		: defaultClasses.join( ' ' );
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

function CNOEventInfo( { data, dispatch, children } ) {
	const { locations, title, link, brief_description } =
		data as PrettyEventData;
	return (
		<div className="col flex-lg-grow-1 d-flex flex-column flex-wrap order-3 order-lg-0">
			<h2
				className="text-gray font-pill-gothic mb-0"
				dangerouslySetInnerHTML={ { __html: title } }
			/>
			<p
				className="mb-0"
				dangerouslySetInnerHTML={ { __html: brief_description } }
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
