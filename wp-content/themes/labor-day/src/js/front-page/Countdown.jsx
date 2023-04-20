import { useState, useEffect } from '@wordpress/element';
import CountdownContainer from './CountdownContainer';

export default function CountdownTimer() {
	const [remainingTime, setRemainingTime] = useState({
		days: '-',
		hours: '-',
		minutes: '-',
		seconds: '-',
	});

	useEffect(() => {
		const intervalId = setInterval(() => {
			const now = new Date();
			const targetDate = new Date('September 1, 2023');
			const timeDiff = targetDate.getTime() - now.getTime();
			const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
			const hours = Math.floor(
				(timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
			);
			const minutes = Math.floor(
				(timeDiff % (1000 * 60 * 60)) / (1000 * 60),
			);
			const seconds = Math.floor((timeDiff % (1000 * 60)) / 1000);
			setRemainingTime({ days, hours, minutes, seconds });
		}, 1000);

		return () => clearInterval(intervalId);
	}, []);
	if (Object.values(remainingTime).every((el) => el === 0)) {
		return '';
	} else {
		return (
			<div className="countdown__container">
				{remainingTime.days === 0 ? (
					''
				) : (
					<CountdownContainer type="Days" data={remainingTime.days} />
				)}
				<CountdownContainer type="Hours" data={remainingTime.hours} />
				<CountdownContainer
					type="Minutes"
					data={remainingTime.minutes}
				/>
				<CountdownContainer
					type="Seconds"
					data={remainingTime.seconds}
				/>
			</div>
		);
	}
}
