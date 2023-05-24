import '../../styles/pages/front-page.scss';
import { createRoot, useState, useEffect } from '@wordpress/element';
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

function CountdownApp() {
	const [remainingTime, setRemainingTime] = useState({
		days: '-',
		hours: '-',
		minutes: '-',
		seconds: '-',
	});

	useEffect(() => {
		const now = new Date();
		const targetDate = new Date('September 1, 2023');
		const timeDiff = targetDate.getTime() - now.getTime();
		if (0 >= timeDiff) {
			setRemainingTime({
				days: 0,
				hours: 0,
				minutes: 0,
				seconds: 0,
			});
		} else {
			const intervalId = setInterval(() => {
				const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
				const hours = Math.floor(
					(timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
				);
				const minutes = Math.floor(
					(timeDiff % (1000 * 60 * 60)) / (1000 * 60)
				);
				const seconds = Math.floor((timeDiff % (1000 * 60)) / 1000);
				setRemainingTime({ days, hours, minutes, seconds });
			}, 1000);
			return intervalId;
		}
		return () => clearInterval(intervalId);
	}, []);
	if (Object.values(remainingTime).every((val) => 0 >= val)) {
		return;
	} else return <CountdownTimer remainingTime={remainingTime} />;
}

createRoot(document.getElementById('countdown')).render(<CountdownApp />);
