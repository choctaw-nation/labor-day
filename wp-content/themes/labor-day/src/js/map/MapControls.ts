/**
 * An Abstract class that provides the child class with its engine.
 */
export default abstract class MapControls {
	/**
	 * Attaches the eventListeners to the appropriate elements
	 *
	 * @param  nodeList the labels & inputs to attach eventListeners to
	 */
	handleNodeList( nodeList: NodeListOf< HTMLInputElement > ) {
		nodeList.forEach( ( node ) => {
			node.addEventListener( 'change', ( ev ) => {
				const target = ev.target as HTMLInputElement;
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
	}
}
