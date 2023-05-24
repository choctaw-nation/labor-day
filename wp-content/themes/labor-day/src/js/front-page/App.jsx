import '../../styles/pages/front-page.scss';
import { createRoot } from '@wordpress/element';
import CountdownTimer from './Countdown';
import { newSlider } from '../swiper';

(function initSlider() {
	const entertainmentSlider = document.getElementById('entertainment-slider');
	const registrationSlider = document.getElementById('registration-slider');
	newSlider(entertainmentSlider, {
		slidesPerView: 4,
		navigation: {
			nextEl: '.entertainment-slider-navigation.swiper-button-next',
			prevEl: '.entertainment-slider-navigation.swiper-button-prev',
		},
	});
	newSlider(registrationSlider, {
		navigation: {
			nextEl: '.registration-slider-navigation.swiper-button-next',
			prevEl: '.registration-slider-navigation.swiper-button-prev',
		},
	});
})();

function App() {
	return <CountdownTimer />;
}

createRoot(document.getElementById('countdown')).render(<App />);
