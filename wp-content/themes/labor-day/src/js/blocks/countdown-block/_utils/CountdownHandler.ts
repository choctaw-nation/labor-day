import { calculateTimeRemaining } from './calculateTimeRemaining';
import { padZero } from './padZero';
import { TimeRemainingObject } from './types';
import { unitCanShow } from './unitCanShow';

export class CountdownHandler {
	private labels = {
		days: 'Days',
		hours: 'Hours',
		minutes: 'Minutes',
		seconds: 'Seconds',
	};
	private targetDate: string;
	private showEmptyLabels: boolean;
	private showDays: boolean;
	private showHours: boolean;
	private showMinutes: boolean;
	private showSeconds: boolean;
	private completionMessage: string | null;
	private numberColor: string | null;
	private labelColor: string | null;
	private countdownContainer: HTMLElement;

	/**
	 * Constructor
	 *
	 * @param block The countdown block element
	 */
	constructor( block: HTMLElement ) {
		const targetDate = block.getAttribute( 'data-target-date' );
		if ( ! targetDate ) {
			throw new Error( 'Missing target date' );
		}
		this.targetDate = targetDate;
		this.showEmptyLabels =
			block.getAttribute( 'data-show-empty-labels' ) === 'true';
		this.showDays = block.getAttribute( 'data-show-days' ) === 'true';
		this.showHours = block.getAttribute( 'data-show-hours' ) === 'true';
		this.showMinutes = block.getAttribute( 'data-show-minutes' ) === 'true';
		this.showSeconds = block.getAttribute( 'data-show-seconds' ) === 'true';
		this.completionMessage = block.getAttribute(
			'data-completion-message'
		);
		this.numberColor = block.getAttribute( 'data-number-color' );
		this.labelColor = block.getAttribute( 'data-label-color' );

		const countdownContainer = block.querySelector< HTMLElement >(
			'.countdown-block__display'
		);
		if ( ! countdownContainer ) {
			throw new Error( 'Missing countdown container' );
		}
		this.countdownContainer = countdownContainer;
	}

	/**
	 * Start the countdown
	 */
	countdown(): void {
		// Initial update
		const isExpired = this.updateCountdown();

		// Continue updating every second if not expired
		if ( ! isExpired ) {
			const intervalId = setInterval( () => {
				const expired = this.updateCountdown();
				if ( expired ) {
					clearInterval( intervalId );
				}
			}, 1000 );
		}
		// countdown
	}

	/**
	 * Update the countdown display
	 *
	 * @return Whether the countdown has expired
	 */
	private updateCountdown(): boolean {
		const timeRemaining = calculateTimeRemaining( this.targetDate )!;

		if ( timeRemaining.isExpired ) {
			this.setCompletionMessage();
			return true; // Stop the timer
		}

		const units = [
			{ key: 'days', show: this.showDays, label: 'Days' },
			{
				key: 'hours',
				show: this.showHours,
				label: 'Hours',
			},
			{
				key: 'minutes',
				show: this.showMinutes,
				label: 'Minutes',
			},
			{
				key: 'seconds',
				show: this.showSeconds,
				label: 'Seconds',
			},
		] as { key: keyof TimeRemainingObject; show: boolean; label: string }[];

		const countdownUnits = units.map( ( unit ) => {
			if ( unit.show && unitCanShow( timeRemaining, unit.key, this.showEmptyLabels ) ) {
				return this.createCountdownUnit( timeRemaining[ unit.key ] as number, unit.label );
			}
			return null;
		} ).filter( Boolean );

		this.countdownContainer.innerHTML = countdownUnits.join( '' );
		return false; // Continue the timer
	}

	/**
	 * Set the completion message
	 */
	private setCompletionMessage() {
		this.countdownContainer.innerHTML = `<p class="countdown-block__completion" style="font-size: var(--numberFontSize,var(--wp--preset--font-size--lg,2rem)); color: ${ this.numberColor };">
				${ this.completionMessage }
        </p>`;
	}

	private createCountdownUnit( value: number, unitLabel: string ): string {
		const label =
		'seconds' !== unitLabel && '01' === padZero( value )
			? unitLabel.slice( 0, -1 )
			: unitLabel;
		return `
            <div class="countdown-block__unit">
                <div class="countdown-block__number" style="color: ${ this.numberColor };">${ padZero( value ) }</div>
                <div class="countdown-block__label" style="color: ${ this.labelColor };">${ label }</div>
            </div>
        `;
	}
}
