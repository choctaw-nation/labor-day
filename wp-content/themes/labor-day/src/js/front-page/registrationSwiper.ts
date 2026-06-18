import Swiper from 'swiper';
import { Navigation, Pagination, A11y } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/a11y';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

export function initRegistrationSwiper() {
	const registrationSlider = document.getElementById( 'registration-slider' );
	if ( ! registrationSlider ) {
		return;
	}
	new Swiper( registrationSlider, {
		modules: [ Navigation, Pagination, A11y ],
		direction: 'horizontal',
		loop: false,
		slidesPerView: 1,
		pagination: {
			el: '.swiper-pagination',
			enabled: true,
		},
		spaceBetween: 20,
		navigation: {
			enabled: true,
			nextEl: '.registration-slider-navigation.swiper-button-next',
			prevEl: '.registration-slider-navigation.swiper-button-prev',
		},
		breakpoints: {
			576: {
				slidesPerView: 2,
				slidesPerGroup: 2,
			},
			767: {
				slidesPerView: 3,
				slidesPerGroup: 3,
			},
		},
	} );
}
