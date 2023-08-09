import Swiper from 'swiper';
import { Navigation, Pagination } from 'swiper/modules';
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
	spaceBetween: 20,
	breakpoints: {
		767: {
			slidesPerView: 3,
			slidesPerGroup: 3,
		},
	},
};

/**
 *
 * @param {HTMLElement} el the element to create a slider on
 * @returns swiper instance
 */
export function newSlider(el, args = {}) {
	const newArgs = Object.assign({}, defaultArgs, args);
	const swiper = new Swiper(el, newArgs);
	return swiper;
}
