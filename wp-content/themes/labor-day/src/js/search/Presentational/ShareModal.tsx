import React from '@wordpress/element';
import '../../../styles/components/_share-modal.scss';
declare const cnoSiteData: { rootUrl: string };

export default function ShareModal({
	showShareModal,
	shareEventObject,
	dispatch,
}) {
	const { link, title } = shareEventObject;
	const url = encodeURIComponent(link);
	return (
		<div
			style={{
				display: `${showShareModal ? 'block' : 'none'}`,
				overflow: `${showShareModal ? 'hidden' : 'auto'}`,
			}}
			className="share-event__overlay overlay"
			onClick={(ev) => {
				if (!ev.target.classList.contains('overlay')) return;
				dispatch({ type: 'closeModal' });
			}}
		>
			<dialog
				id="share-event"
				className="share-event"
				open={showShareModal}
			>
				<ul className="share-locations">
					<li>
						<a
							href={`https://www.facebook.com/dialog/share?app_id=3353870511533012&display=popup&href=${link}&redirect_uri=${cnoSiteData.rootUrl}/events`}
							title="Share on Facebook"
							target="_blank"
							className="share-locations__location--facebook btn__outline--secondary"
						>
							<i className="fa-brands fa-facebook"></i> Share on
							Facebook
						</a>
					</li>
					<li>
						<a
							href={`sms:?&body=Halito%20(Hello)! I'm going to "${title}" and I thought you'd like to check it out, too! Learn more at ${url}`}
							target="_blank"
							className="share-locations__location--text btn__outline--secondary"
						>
							<i className="fa-solid fa-comment"></i> Share via
							SMS
						</a>
					</li>
					<li>
						<a
							href={`mailto:?subject=Check out this event!&body=Halito%20(Hello)! I'm going to "${title}" and I thought you'd like to check it out, too! Learn more at ${url}.`}
							title="Share via Email"
							className="share-locations__location--email btn__outline--secondary"
						>
							<i className="fa-solid fa-envelope-open-text"></i>{' '}
							Share via Email
						</a>
					</li>
				</ul>
			</dialog>
		</div>
	);
}
