/**
 * An Abstract class that provides the child class with its engine.
 */
export default abstract class MapControls {
	/**
	 * Attaches the eventListeners to the appropriate elements
	 *
	 * @param {NodeList} nodeList the labels & inputs to attach eventListeners to
	 */
	handleNodeList( nodeList: NodeList ) {
		nodeList.forEach( ( node ) => {
			node.addEventListener( 'change', ( { target } ) => {
				this.toggleVisibility( target );
			} );
		} );
	}

	/**
	 * Toggles the visibility of a `g` element
	 *
	 * @param {HTMLElement} target A containing div
	 */
	toggleVisibility( target: HTMLInputElement ) {
		const el = document.getElementById( target.dataset.id! );
		if ( ! el ) return;
		el.style.visibility = target.checked ? 'visible' : 'hidden';
		console.log( el );
	}
}
