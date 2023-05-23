import { library, dom } from '@fortawesome/fontawesome-svg-core';
import {
	faCircleInfo,
	faComment,
	faEnvelopeOpenText,
	faLocationDot,
	faPlus,
	faShare,
} from '@fortawesome/free-solid-svg-icons';
import { faFacebook, faInstagram } from '@fortawesome/free-brands-svg-icons';

library.add(
	faFacebook,
	faComment,
	faShare,
	faLocationDot,
	faCircleInfo,
	faInstagram,
	faPlus,
	faEnvelopeOpenText
);

/**
 * Replaces any existing <i> tags with <svg>
 * Sets up a MutationObserver to continue doing this as the DOM changes.
 */
dom.watch();
