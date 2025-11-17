import { SwiperOptions } from 'swiper/types';
import { Pagination, Navigation } from 'swiper/modules';

export const swiperArgs: SwiperOptions = {
	modules: [ Pagination, Navigation ],
	spaceBetween: 30,
	slidesPerView: 1,
	loop: true,
	pagination: {
		el: `.swiper-pagination.registration-swiper-pagination`,
		clickable: false,
		enabled: true,
	},
	navigation: {
		nextEl: `.swiper-button-next.registration-swiper-navigation`,
		prevEl: `.swiper-button-prev.registration-swiper-navigation`,
		enabled: true,
		addIcons: true,
	},
	autoHeight: true,
	grabCursor: false,
	simulateTouch: false,
	keyboard: false,
	breakpoints: {
		991: {
			slidesPerView: 3,
			slidesPerGroup: 3,
		},
	},
};
