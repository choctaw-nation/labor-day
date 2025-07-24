import '../../styles/pages/map.scss';
import MapControls from './MapControls';

/**
 * The class that grabs DOM elements and calls the appropriate method.
 */
new ( class MapController extends MapControls {
	constructor() {
		super();
		this.handleLayerVisibility( [ 'buildings', 'icons', 'locations' ] );
		this.toggleAll();
	}

	/**
	 * Accepts an array of strings that finish the BEM class to select (e.g. `.map-toggles__${selector}`)
	 *
	 * @param selectors - the class ending to inject.
	 */
	handleLayerVisibility( selectors: string[] ) {
		selectors.forEach( ( selector ) =>
			this.controlLayerVisibility( selector )
		);
	}

	/** Injects the class, selects the elements, and calls `handleNodeList()`
	 *
	 * @param selector - the string to inject into \`.map-toggles__${selector} input:not(.toggle-all)\`
	 */
	private controlLayerVisibility( selector: string ) {
		const layer = document.querySelectorAll< HTMLInputElement >(
			`.map-toggles__${ selector } input:not(.toggle-all)`
		);
		if ( ! layer ) return;
		this.handleNodeList( layer );
	}

	/**
	 * Controls the toggling of all checkboxes in a section.
	 */
	private toggleAll() {
		const toggleAllBoxes =
			document.querySelectorAll< HTMLInputElement >( '.toggle-all' );

		toggleAllBoxes.forEach( ( el ) => {
			el.addEventListener( 'change', ( ev ) => {
				const target = ev.target as HTMLInputElement;
				if ( ! target ) return;

				const selector = target.dataset.selector;
				const checkboxes =
					document.querySelectorAll< HTMLInputElement >(
						`.map-toggles__${ selector } input:not(.toggle-all)`
					);
				checkboxes.forEach( ( checkbox, i ) => {
					checkbox.checked = ! checkbox.checked;
					this.toggleVisibility( checkbox );
				} );
			} );
		} );
	}
} )();
