import Model from './Model';
import View from './View';

export default class Search {
	showFilters = false;
	constructor() {
		this.init();
	}
	init() {
		const filterToggle = document.getElementById('toggle-filters');
		if (!filterToggle) return;
		filterToggle.addEventListener('click', () => {
			setShowFilters();
			showFilters = !showFilters;
			updateButtonText(filterToggle, showFilters);
		});
		Model.getPosts().then((res) => View.showResults(res));
	}
}
