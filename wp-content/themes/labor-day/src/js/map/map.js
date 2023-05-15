import '../../styles/pages/map.scss';

/** An Abstract class that provides the child class with its engine. */
class MapControls {
	/** Attaches the two eventListeners to the approriate elements
	 * @param {NodeList} nodeList the divs & inputs to attach eventListeners to
	 */
	handleNodeList( nodeList ) {
		nodeList.forEach( ( node ) => {
			node.addEventListener(
				'click',
				this.#handleVisibility.bind( this )
			);
			node.addEventListener( 'change', ( { target } ) => {
				this.#toggleVisibility( target );
			} );
		} );
	}

	/** The callback function that calls toggleVisibility */
	#handleVisibility( ev ) {
		const { target } = ev;
		const input = target.querySelector( 'input' );
		if ( null === input ) return;
		input.checked = ! input.checked;
		this.#toggleVisibility( target, input );
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
}

/** The class that grabs DOM elements and calls the appropriate method. */
new ( class MapController extends MapControls {
	constructor() {
		super();
		this.#handleLayers();
		this.#handleIcons();
		this.#handleLocations();
	}
	/** Control the map's visible layers */
	#handleLayers() {
		const layerToggleDivs = document.querySelectorAll(
			'.map-toggles__areas .map-toggles__layer-toggle'
		);
		this.handleNodeList( layerToggleDivs );
	}
	#handleIcons() {
		const iconToggles = document.querySelectorAll(
			'.map-toggles__icons .map-toggles__layer-toggle'
		);
		this.handleNodeList( iconToggles );
	}
	#handleLocations() {
		const locationToggles = document.querySelectorAll(
			'.map-toggles__locations .map-toggles__layer-toggle'
		);
		this.handleNodeList( locationToggles );
	}
} )();
