import CountdownContainer from './CountdownContainer';

export default function CountdownTimer( { remainingTime } ) {
	if ( Object.values( remainingTime ).every( ( el ) => el <= 0 ) ) {
		return '';
	} else {
		return (
			<div className="countdown__container d-grid justify-content-evenly border-top border-5 border-white fs-2">
				{ remainingTime.days === 0 ? (
					''
				) : (
					<CountdownContainer
						delay={ 0 }
						type="Days"
						data={ remainingTime.days }
					/>
				) }
				<CountdownContainer
					type="Hours"
					delay={ 1 }
					data={ remainingTime.hours }
				/>
				<CountdownContainer
					delay={ 2 }
					type="Minutes"
					data={ remainingTime.minutes }
				/>
				<CountdownContainer
					delay={ 3 }
					type="Seconds"
					data={ remainingTime.seconds }
				/>
			</div>
		);
	}
}
