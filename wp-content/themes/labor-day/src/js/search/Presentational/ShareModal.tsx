import React from '@wordpress/element';
import '../../../styles/components/_share-modal.scss';
declare const cnoSiteData: { rootUrl: string };

export default function ShareModal({
	showShareModal,
	setShowShareModal,
	shareEventObject,
}) {
	const url = encodeURIComponent(shareEventObject.link);
	// useEffect(() => {
	// 	const body = document.querySelector('body');
	// 	if (!body) return;
	// 	body.style.overflow = `${showShareModal ? 'hidden' : 'auto'}`;
	// }, [showShareModal]);
	return (
		<div
			style={{
				display: `${showShareModal ? 'block' : 'none'}`,
				overflow: `${showShareModal ? 'hidden' : 'auto'}`,
			}}
			className="share-event__overlay overlay"
			onClick={(ev) => {
				setShowShareModal(false);
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
							href={`https://www.facebook.com/sharer/sharer.php?url=${url}`}
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
							href={`sms:?&body=Halito%20(Hello)! I'm going to "${shareEventObject.title}" and I thought you'd like to check it out, too! Learn more at ${url}`}
							target="_blank"
							className="share-locations__location--text btn__outline--secondary"
						>
							<i className="fa-solid fa-comment"></i> Share via
							SMS
						</a>
					</li>
					<li>
						<a
							href={`mailto:?subject=Check out this event!&body=Halito%20(Hello)! I'm going to "${shareEventObject.title}" and I thought you'd like to check it out, too! Learn more at ${url}.`}
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
