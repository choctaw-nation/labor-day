export default function usePopulateModalFields( modalSelector, callback ) {
	let retry = false;

	function tryInit() {
		const modalEl = document.querySelector( modalSelector );
		if ( ! modalEl ) {
			if ( ! retry ) {
				retry = true;
				setTimeout( tryInit, 1000 );
			} else {
				throw new Error( 'Modal element not found' );
			}
			return;
		}
		// Observe changes in the style attribute
		const observer = new MutationObserver( () => {
			const currentValue = getComputedStyle( modalEl ).display;
			if ( currentValue !== 'none' ) {
				callback();
			}
		} );

		observer.observe( modalEl, {
			attributes: true,
			attributeFilter: [ 'style' ],
		} );
	}

	tryInit();
}
