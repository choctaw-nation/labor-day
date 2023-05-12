import '../../styles/pages/map.scss';

new ( class MapController {
	constructor() {
		this.#handleLayers();
		this.#handleIcons();
	}

	/** Control the map's visible layers */
	#handleLayers() {
		const layers = document.querySelectorAll( '.map svg > g' );
		const layerToggleDivs = document.querySelectorAll(
			'.map-toggles__areas .map-toggles__layer-toggle'
		);
		layerToggleDivs.forEach( ( layerToggleDiv ) => {
			layerToggleDiv.addEventListener( 'click', ( { target } ) => {
				const input = target.querySelector( 'input' );
				if ( null === input ) return;
				input.checked = ! input.checked;
				this.#toggleVisibility( target, input );
			} );
			layerToggleDiv.addEventListener( 'change', ( { target } ) => {
				this.#toggleVisibility( target );
			} );
		} );
	}

	/** Toggles the visibility of a `g` element
	 * @param {HTMLElement} target A containing div
	 * @param {HTMLElement} input the checkbox element
	 */
	#toggleVisibility( target, input = null ) {
		if ( null === input ) {
			const el = document.getElementById( target.dataset.id );
			el.style.visibility = target.checked ? 'visible' : 'hidden';
		} else {
			const el = document.getElementById( target.dataset.id );
			el.style.visibility = input.checked ? 'visible' : 'hidden';
		}
	}

	#handleIcons() {
		const icons = document.querySelectorAll( 'svg #Icons g' );
		const iconToggles = document.querySelectorAll(
			'.map-toggles__icons .map-toggles__layer-toggles'
		);
	}
} )();
