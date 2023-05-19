import React from '@wordpress/element';
import '../../../styles/components/_share-modal.scss';
declare const cnoSiteData: { rootUrl: string };

export default function ShareModal({ showShareModal, setShowShareModal }) {
	return (
		<div
			style={{
				display: `${showShareModal ? 'block' : 'none'}`,
			}}
			className="share-event__overlay overlay"
			onClick={(ev) => {
				console.log(ev.target);
				console.log(showShareModal);
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
							href={`https://www.facebook.com/sharer/sharer.php?url=${cnoSiteData.rootUrl}`}
							title="Share on Facebook"
							target="_blank"
							className="share-locations__location--facebook btn"
						>
							<i className="fa-brands fa-facebook"></i> Share on
							Facebook
						</a>
					</li>
					<li>
						<a
							href={`https://twitter.com/intent/tweet?text=Twitter%20Text&url=' . ${cnoSiteData.rootUrl}`}
							target="_blank"
							className="share-locations__location--text btn"
						>
							<i className="fa-solid fa-comment"></i> Share via
							SMS
						</a>
					</li>
					<li>
						<a
							href="mailto:?subject=Check out this event!"
							title="Share via Email"
							className="share-locations__location--email btn"
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
