// Types
import React, { Dispatch, PropsWithChildren } from 'react';
import type { PrettyEventData } from '../utilities/types';

// Components
import FeaturedImage from './FeaturedImage';
import EventTimeBanner from './TimeBanner';
import ShareModalButton from './ShareModalButton';
import LocationButton from './LocationButton';

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
interface SinglePostProps {
	dispatch?: Dispatch< { type: string; payload: {} } >;
	data: PrettyEventData;
	triggerModal?: Function;
	extendedClass?: string;
}
export default function SinglePost( {
	data,
	extendedClass,
	children,
	dispatch,
}: PropsWithChildren< SinglePostProps > ) {
	const { info, featured_image, locations, title, link, brief_description } =
		data;
	return (
		<div className={ getTheClass( extendedClass ) }>
			<EventTimeBanner info={ info } />
			{ featured_image && (
				<FeaturedImage featuredImage={ featured_image } />
			) }
			<div className="col flex-grow-1 d-flex flex-column flex-wrap order-3 order-xl-0 mt-2 mt-lg-0">
				<h2
					className="text-gray font-pill-gothic mb-0"
					dangerouslySetInnerHTML={ { __html: title } }
				/>
				<p
					className="fs-6"
					dangerouslySetInnerHTML={ { __html: brief_description } }
				/>
				<div className="cno-event__buttons mt-auto d-flex align-items-stretch gap-3 position-relative">
					{ locations && locations.length > 0 && (
						<LocationButton
							name={ locations[ 0 ].name }
							slug={ locations[ 0 ].slug }
						/>
					) }
					<ShareModalButton title={ title } link={ link } />
					{ children }
				</div>
			</div>
		</div>
	);
}
