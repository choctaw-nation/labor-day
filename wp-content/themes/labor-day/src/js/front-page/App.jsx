import { createRoot } from '@wordpress/element';
import Countdown from 'react-countdown';

console.log('hi there from frontpage.js');
(function () {
	if (window.location.pathname === '/') {
		function CountdownTimer() {
			function handleRender({
				days,
				hours,
				minutes,
				seconds,
				completed,
			}) {
				if (!completed) {
					return (
						<div className="countdown__container">
							{days === 0 ? (
								''
							) : (
								<div className="countdown__days">
									<span>{days}</span>{' '}
									<span className="label">Days</span>
								</div>
							)}
							<div className="countdown__hours">
								<span>{hours}</span>{' '}
								<span className="label">Hours</span>
							</div>
							<div className="countdown__minutes">
								<span>{minutes}</span>{' '}
								<span className="label">Minutes</span>
							</div>
							<div className="countdown__seconds">
								<span>{seconds}</span>{' '}
								<span className="label">Seconds</span>
							</div>
						</div>
					);
				} else {
					return (
						<a className="btn__fill--secondary" href="/schedule">
							View Schedule
						</a>
					);
				}
			}
			return (
				<Countdown
					date={new Date('September 1, 2023')}
					renderer={handleRender}
				/>
			);
		}

		createRoot(document.getElementById('countdown')).render(
			<CountdownTimer />,
		);
	} else {
		return;
	}
})();
