import { useRefEffect } from '@wordpress/compose';

import Swiper from 'swiper';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

import { swiperArgs } from '../consts';

export default function useSwiper() {
	const swiperRef = useRefEffect( ( swiper ) => {
		// bail if the element doesn't exist
		if ( ! swiper ) {
			return;
		}
		const swiperInstance = new Swiper( swiper as HTMLElement, swiperArgs );

		return () => {
			if ( swiperInstance && swiperInstance.destroy ) {
				swiperInstance.destroy( true, true );
			}
		};
	}, [] );
	return { swiperRef };
}
