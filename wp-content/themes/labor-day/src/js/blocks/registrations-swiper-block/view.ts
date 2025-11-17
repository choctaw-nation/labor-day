import { swiperArgs } from './consts';
import Swiper from 'swiper';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

document.addEventListener( 'DOMContentLoaded', () => {
	const swiperBlocks = document.querySelectorAll< HTMLElement >(
		'.wp-block-cno-registration-swiper'
	);

	swiperBlocks.forEach( ( block ) => {
		new Swiper(
			block.querySelector( '.swiper' ) as HTMLElement,
			swiperArgs
		);
	} );
} );
