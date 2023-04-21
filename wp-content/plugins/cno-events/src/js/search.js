// import React, { useState, useEffect } from '@wordpress/element';
const POSTS_PER_PAGE = cnoEventData.postsPerPage;

/**
 * =========
 * MODEL
 * =========
 */

/**
 * =========
 * VIEW
 * =========
 */

/** Updates the visibility of the filters */
function setShowFilters() {
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
function updateButtonText(button, showFilters) {
	button.innerText = true === showFilters ? 'Hide Filters' : 'Show Filters';
}
/**
 * ===========
 * CONTROLLER
 * =========
 */

export default function Search() {
	let showFilters = false;
	console.log('hello from search.js');
	const filterToggle = document.getElementById('toggle-filters');
	if (!filterToggle) return;
	filterToggle.addEventListener('click', () => {
		setShowFilters();
		showFilters = !showFilters;
		updateButtonText(filterToggle, showFilters);
	});
}
