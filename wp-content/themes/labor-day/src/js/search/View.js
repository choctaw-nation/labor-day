export default new (class View {
	constructor() {}
	/** Updates the visibility of the filters */
	setShowFilters() {
		const filtersContainer = document.querySelector(
			'.cno-event-search-filters',
		);
		filtersContainer.classList.toggle('hide');
	}
	/**
	 *
	 * @param {HTMLElement} button the toggle
	 * @param {boolean} showFilters the filters' visibility (aka state)
	 */
	updateButtonText(button, showFilters) {
		button.innerText =
			true === showFilters ? 'Hide Filters' : 'Show Filters';
	}
})();
