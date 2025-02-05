import React from '@wordpress/element';
import EventButton from '../ui/EventButton';
import { faShare } from '@fortawesome/free-solid-svg-icons';
import Modal from 'bootstrap/js/dist/modal';

const modalEl = document.getElementById( 'shareEventModal' );
const modalInstance = new Modal( modalEl );

export default function ShareModalButton( { title, link } ) {
	return (
		<EventButton
			onClick={ () => {
				handleModal( title, link );
			} }
			element="button"
			icon={ faShare }
			text="Share"
		/>
	);
}

function handleModal( title: string, link: string ) {
	if ( ! modalEl || ! modalInstance ) {
		return;
	}
	const body = modalEl.querySelector( '.modal-body' );
	if ( ! body ) {
		return;
	}
	body.innerHTML = '';
	body.innerHTML = `
	<ul class="share-locations list-unstyled p-0 m-0 fs-6">
		<li class="my-3">
			<a href="https://www.facebook.com/dialog/share?app_id=3353870511533012&amp;display=popup&amp;href=${ link }&amp;redirect_uri=${ link }" title="Share on Facebook" target="_blank"><svg class="svg-inline--fa fa-facebook" aria-hidden="true" focusable="false" data-prefix="fab" data-icon="facebook" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" data-fa-i2svg=""><path fill="currentColor" d="M512 256C512 114.6 397.4 0 256 0S0 114.6 0 256C0 376 82.7 476.8 194.2 504.5V334.2H141.4V256h52.8V222.3c0-87.1 39.4-127.5 125-127.5c16.2 0 44.2 3.2 55.7 6.4V172c-6-.6-16.5-1-29.6-1c-42 0-58.2 15.9-58.2 57.2V256h83.6l-14.4 78.2H287V510.1C413.8 494.8 512 386.9 512 256h0z"></path></svg><!-- <i class="fa-brands fa-facebook"></i> Font Awesome fontawesome.com --> Share on Facebook</a>
		</li>
		<li class="my-3">
			<a href="sms:?&body=Halito%20(Hello)! I'm going to ${ title } and I thought you'd like to check it out, too! Learn more at ${ link }" target=" _blank" class="share-locations__location--text btn__outline--secondary">
				<i class="fa-solid fa-comment"></i> Share via
				SMS
			</a>
		</li>
		<li class="my-3">
			<a href="mailto:?subject=Check out this event!&body=Halito%20(Hello)! I'm going to ${ title } and I thought you'd like to check it out, too! Learn
				more at ${ link }." title=" Share via Email" class="share-locations__location--email btn__outline--secondary">
				<i class="fa-solid fa-envelope-open-text"></i>
				Share via Email
			</a>
		</li>
	</ul>`;
	modalInstance.show();
}
