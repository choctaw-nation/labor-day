import { library, dom } from '@fortawesome/fontawesome-svg-core';
import {
	faComment,
	faEnvelopeOpenText,
	faLocationDot,
	faShare,
} from '@fortawesome/free-solid-svg-icons';
import { faFacebook, faInstagram } from '@fortawesome/free-brands-svg-icons';

library.add(
	faFacebook,
	faComment,
	faShare,
	faLocationDot,
	faInstagram,
	faEnvelopeOpenText
);

/**
 * Replaces any existing <i> tags with <svg>
 * Sets up a MutationObserver to continue doing this as the DOM changes.
 */
dom.watch();
