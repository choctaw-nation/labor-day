import Swiper, { Navigation, Pagination } from 'swiper';
import 'swiper/scss';
import 'swiper/scss/navigation';
import 'swiper/scss/pagination';

const defaultArgs = {
	modules: [Navigation, Pagination],
	direction: 'horizontal',
	loop: false,

	// If we need pagination
	pagination: {
		el: '.swiper-pagination',
	},

	// Navigation arrows
	navigation: {
		nextEl: '.swiper-button-next',
		prevEl: '.swiper-button-prev',
	},
	slidesPerView: 3,
	spaceBetween: 20,
};

/**
 *
 * @param {HTMLElement} el the element to create a slider on
 * @returns swiper instance
 */
export function newSlider(el, args = {}) {
	if (window.innerWidth < 767) {
		defaultArgs.slidesPerView = 1;
	}
	const newArgs = Object.assign({}, defaultArgs, args);
	const swiper = new Swiper(el, newArgs);
	return swiper;
}
