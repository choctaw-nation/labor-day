import React from '@wordpress/element';

import type { searchAppState } from '../utilities/types';
declare const cnoSiteData: { rootUrl: string };

export default function ShareModal( {
	showShareModal,
	shareEventObject,
	dispatch,
}: {
	showShareModal: boolean;
	shareEventObject: searchAppState[ 'shareEventObject' ];
	dispatch: Function;
} ) {
	const { link: eventLink, title } = shareEventObject;
	const eventUrl = encodeURIComponent( eventLink );
	const links = [
		{
			anchor: {
				title: 'Share on Facebook',
				href: `https://www.facebook.com/dialog/share?app_id=3353870511533012&display=popup&href=${ eventUrl }&redirect_uri=${ cnoSiteData.rootUrl }/events`,
				class: 'share-locations__location--facebook',
			},
			iconClasses: 'fa-brands fa-facebook',
		},
		{
			anchor: {
				title: 'Share via SMS',
				href: `sms:?&body=Halito%20(Hello)! I'm going to "${ title }" and I thought you'd like to check it out, too! Learn more at ${ eventUrl }`,
				class: 'share-locations__location--text',
			},
			iconClasses: 'fa-solid fa-comment',
		},
		{
			anchor: {
				title: 'Share via Email',
				href: `mailto:?subject=Check out this
				event!&body=Halito%20(Hello)! I'm going to "${ title }" and I thought you'd like to check it out, too! Learn more at ${ eventUrl }`,
				class: 'share-locations__location--email',
			},
			iconClasses: 'fa-solid fa-envelope-open-text',
		},
	];

	return (
		<div
			className={ `share-event__overlay z-2 position-fixed overlay ${
				showShareModal
					? 'd-block overflow-hidden'
					: 'd-none overflow-auto'
			}` }
			onClick={ ( ev ) => {
				if ( ! ev.target.classList.contains( 'overlay' ) ) return;
				dispatch( { type: 'closeModal' } );
			} }
		>
			<dialog
				id="share-event"
				className="share-event position-fixed z-3 d-flex rounded-0 p-4 border-2 border border-dark"
				open={ showShareModal }
			>
				<ul className="share-locations list-unstyled m-0 p-0 fs-6">
					{ links.map( ( link, index ) => (
						<li key={ index } className="my-3">
							<a
								href={ link.anchor.href }
								rel="noopener noreferrer"
								target="_blank"
								className={ `${ link.anchor.class } btn btn-outline-secondary` }
							>
								<i className={ link.iconClasses }></i>{ ' ' }
								{ link.anchor.title }
							</a>
						</li>
					) ) }
				</ul>
			</dialog>
		</div>
	);
}
