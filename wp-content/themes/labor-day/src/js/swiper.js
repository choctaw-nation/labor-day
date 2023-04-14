import Swiper, { Navigation, Pagination } from 'swiper';
import 'swiper/scss';
import 'swiper/scss/navigation';
import 'swiper/scss/pagination';

/**
 *
 * @param {HTMLElement} el the element to create a slider on
 * @returns swiper instance
 */
export function newSlider(el) {
	console.log(el);
	const swiper = new Swiper(el, {
		modules: [Navigation, Pagination],
		direction: 'horizontal',
		loop: true,

		// If we need pagination
		pagination: {
			el: '.swiper-pagination',
		},

		// Navigation arrows
		navigation: {
			nextEl: '.swiper-button-next',
			prevEl: '.swiper-button-prev',
		},
		slidesPerView: 'auto',
		spaceBetween: 20,
	});
	return swiper;
}
