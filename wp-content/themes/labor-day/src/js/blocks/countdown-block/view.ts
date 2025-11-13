/**
 * Frontend JavaScript for the Countdown Timer block
 * Handles real-time countdown updates
 */

document.addEventListener( 'DOMContentLoaded', function() {
	const countdownBlocks = document.querySelectorAll( '.wp-block-telex-countdown-timer' );
	
	countdownBlocks.forEach( function( block ) {
		const targetDate = block.getAttribute( 'data-target-date' );
		const showDays = block.getAttribute( 'data-show-days' ) === 'true';
		const showHours = block.getAttribute( 'data-show-hours' ) === 'true';
		const showMinutes = block.getAttribute( 'data-show-minutes' ) === 'true';
		const showSeconds = block.getAttribute( 'data-show-seconds' ) === 'true';
		const labelDays = block.getAttribute( 'data-label-days' );
		const labelHours = block.getAttribute( 'data-label-hours' );
		const labelMinutes = block.getAttribute( 'data-label-minutes' );
		const labelSeconds = block.getAttribute( 'data-label-seconds' );
		const completionMessage = block.getAttribute( 'data-completion-message' );
		const numberColor = block.getAttribute( 'data-number-color' );
		const labelColor = block.getAttribute( 'data-label-color' );
		const numberFontSize = block.getAttribute( 'data-number-font-size' );
		const labelFontSize = block.getAttribute( 'data-label-font-size' );
		
		const displayElement = block.querySelector( '.countdown-timer-display' );
		
		if ( ! targetDate || ! displayElement ) {
			return;
		}
		
		function calculateTimeRemaining() {
			const now = new Date().getTime();
			const target = new Date( targetDate ).getTime();
			const difference = target - now;
			
			if ( difference <= 0 ) {
				return {
					days: 0,
					hours: 0,
					minutes: 0,
					seconds: 0,
					isExpired: true
				};
			}
			
			const days = Math.floor( difference / ( 1000 * 60 * 60 * 24 ) );
			const hours = Math.floor( ( difference % ( 1000 * 60 * 60 * 24 ) ) / ( 1000 * 60 * 60 ) );
			const minutes = Math.floor( ( difference % ( 1000 * 60 * 60 ) ) / ( 1000 * 60 ) );
			const seconds = Math.floor( ( difference % ( 1000 * 60 ) ) / 1000 );
			
			return {
				days: days,
				hours: hours,
				minutes: minutes,
				seconds: seconds,
				isExpired: false
			};
		}
		
		function padZero( num ) {
			return String( num ).padStart( 2, '0' );
		}
		
		function updateCountdown() {
			const timeRemaining = calculateTimeRemaining();
			
			if ( timeRemaining.isExpired ) {
				displayElement.innerHTML = '<div class="countdown-timer-completion" style="font-size: ' + numberFontSize + 'px; color: ' + numberColor + ';">' + completionMessage + '</div>';
				return true; // Stop the timer
			}
			
			let html = '';
			
			if ( showDays ) {
				html += '<div class="countdown-timer-unit">';
				html += '<div class="countdown-timer-number" style="font-size: ' + numberFontSize + 'px; color: ' + numberColor + ';">' + padZero( timeRemaining.days ) + '</div>';
				html += '<div class="countdown-timer-label" style="font-size: ' + labelFontSize + 'px; color: ' + labelColor + ';">' + labelDays + '</div>';
				html += '</div>';
			}
			
			if ( showHours ) {
				html += '<div class="countdown-timer-unit">';
				html += '<div class="countdown-timer-number" style="font-size: ' + numberFontSize + 'px; color: ' + numberColor + ';">' + padZero( timeRemaining.hours ) + '</div>';
				html += '<div class="countdown-timer-label" style="font-size: ' + labelFontSize + 'px; color: ' + labelColor + ';">' + labelHours + '</div>';
				html += '</div>';
			}
			
			if ( showMinutes ) {
				html += '<div class="countdown-timer-unit">';
				html += '<div class="countdown-timer-number" style="font-size: ' + numberFontSize + 'px; color: ' + numberColor + ';">' + padZero( timeRemaining.minutes ) + '</div>';
				html += '<div class="countdown-timer-label" style="font-size: ' + labelFontSize + 'px; color: ' + labelColor + ';">' + labelMinutes + '</div>';
				html += '</div>';
			}
			
			if ( showSeconds ) {
				html += '<div class="countdown-timer-unit">';
				html += '<div class="countdown-timer-number" style="font-size: ' + numberFontSize + 'px; color: ' + numberColor + ';">' + padZero( timeRemaining.seconds ) + '</div>';
				html += '<div class="countdown-timer-label" style="font-size: ' + labelFontSize + 'px; color: ' + labelColor + ';">' + labelSeconds + '</div>';
				html += '</div>';
			}
			
			displayElement.innerHTML = html;
			return false; // Continue the timer
		}
		
		// Initial update
		const isExpired = updateCountdown();
		
		// Continue updating every second if not expired
		if ( ! isExpired ) {
			setInterval( function() {
				const expired = updateCountdown();
				if ( expired ) {
					clearInterval( this );
				}
			}, 1000 );
		}
	} );
} );
