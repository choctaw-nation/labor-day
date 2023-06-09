import { lightFormat } from 'date-fns';
import '../../styles/pages/map.scss';

/**
 * An Abstract class that provides the child class with its engine.
 */
class MapControls {
	/**
	 * Attaches the eventListeners to the approriate elements
	 *
	 * @param {NodeList} nodeList the labels & inputs to attach eventListeners to
	 */
	handleNodeList(nodeList) {
		nodeList.forEach((node) => {
			node.addEventListener('change', ({ target }) => {
				this.toggleVisibility(target);
			});
		});
	}

	/**
	 * Toggles the visibility of a `g` element
	 *
	 * @param {HTMLElement} target A containing div
	 */
	toggleVisibility(target) {
		const el = document.getElementById(target.dataset.id);
		if (!el) return;
		el.style.visibility = target.checked ? 'visible' : 'hidden';
	}
}

/**
 * The class that grabs DOM elements and calls the appropriate method.
 */
class MapController extends MapControls {
	constructor() {
		super();
		this.handleLayerVisibility(['buildings', 'icons', 'locations']);
		this.#toggleAll();
	}

	/**
	 * Accepts an array of strings that finish the BEM class to select (e.g. `.map-toggles__${selector}`)
	 *
	 * @param {array} selectors - the class ending to inject.
	 */
	handleLayerVisibility(selectors) {
		selectors.forEach((selector) => this.#controlLayerVisibility(selector));
	}

	/** Injects the class, selects the elements, and calls `handleNodeList()`
	 *
	 * @param {string} selector - the string to inject into \`.map-toggles__${selector} input:not(.toggle-all)\`
	 */
	#controlLayerVisibility(selector) {
		const layer = document.querySelectorAll(
			`.map-toggles__${selector} input:not(.toggle-all)`
		);
		if (!layer) return;
		this.handleNodeList(layer);
	}

	/**
	 * Controls the toggling of all checkboxes in a section.
	 */
	#toggleAll() {
		const toggleAllBoxes = document.querySelectorAll('.toggle-all');

		toggleAllBoxes.forEach((el) => {
			el.addEventListener('change', (ev) => {
				const { target } = ev;
				if (!target) return;

				const selector = target.dataset.selector;
				const checkboxes = document.querySelectorAll(
					`.map-toggles__${selector} input:not(.toggle-all)`
				);
				checkboxes.forEach((checkbox, i) => {
					checkbox.checked = !checkbox.checked;
					this.toggleVisibility(checkbox);
				});
			});
		});
	}
}
const map = new MapController();
