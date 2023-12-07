import '../../styles/pages/front-page.scss';
import { createRoot, useState, useEffect } from '@wordpress/element';
import CountdownTimer from './Countdown';
import { newSlider } from '../swiper';

(function init() {
	/** Sliders */
	const registrationSlider = document.getElementById('registration-slider');
	if (registrationSlider) {
		newSlider(registrationSlider, {
			slidesPerView: 1,
			navigation: {
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
		});
	}

	// Email Hot Swap
	const subscribeButton = document.getElementById('subscribe-modal-trigger');
	if (subscribeButton) {
		subscribeButton.addEventListener('click', () => fillEmailValues());
	}

	/** Grabs email from initial form and fills in the Gravity Form field */
	function fillEmailValues() {
		const modal = document.getElementById('subscribe-modal');
		const emailInput = document.getElementById('email');
		if (null === emailInput) return;
		const email = emailInput.value ?? '';
		const preFilledEmail = modal.querySelector('input[type="email"]');
		if (preFilledEmail) {
			preFilledEmail.value = email;
		}
	}
})();

function CountdownApp() {
	const [remainingTime, setRemainingTime] = useState({
		days: '-',
		hours: '-',
		minutes: '-',
		seconds: '-',
	});

	useEffect(() => {
		const targetDate = new Date('August 30, 2024');

		const intervalId = setInterval(() => {
			const now = new Date();
			const timeDiff = targetDate.getTime() - now.getTime();

			if (timeDiff <= 0) {
				clearInterval(intervalId);
				setRemainingTime({
					days: 0,
					hours: 0,
					minutes: 0,
					seconds: 0,
				});
			} else {
				const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
				const hours = Math.floor(
					(timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
				);
				const minutes = Math.floor(
					(timeDiff % (1000 * 60 * 60)) / (1000 * 60)
				);
				const seconds = Math.floor((timeDiff % (1000 * 60)) / 1000);
				setRemainingTime({ days, hours, minutes, seconds });
			}
		}, 1000);

		return () => clearInterval(intervalId);
	}, []);

	if (Object.values(remainingTime).every((val) => val <= 0)) {
		return null;
	} else {
		return <CountdownTimer remainingTime={remainingTime} />;
	}
}

createRoot(document.getElementById('countdown')).render(<CountdownApp />);
