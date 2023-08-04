<?php

/** Operational Hours */
class Operational_Hours {
	private array $operations = array();
	private $rv_hours_title   = 'RV/Tent Gate Hours';
	/** Info from client:
	 * Wednesday thru Sat 8:00 am - 11:00 pm
	 * Sunday 10:00 am - 10:00 pm */
	private $rv_date_times = array(
		array(
			'label' => 'Wednesday (Aug 30)',
			'open'  => '8:00 am',
			'close' => '8:00 pm',
		),
		array(
			'label' => 'Thursday (Aug 31) &ndash; Saturday (Sep 1)',
			'open'  => '8:00 am',
			'close' => '11:00 pm',
		),
		array(
			'label' => 'Sunday',
			'open'  => '10:00 am',
			'close' => '10:00 pm',
		),
	);

		/** Construct the class
		 *
		 * @param array $operations_field the Hours of Operations ACF Options field
		 */
	public function __construct( array $operations_field ) {
		$this->operations = $operations_field;
	}

		/** Public API to generate HTML */
	public function list_the_hours() {
		echo "<ul class='hours-list'>";
		$markup  = '';
		$markup .= $this->set_the_rv_hours( $this->rv_hours_title, $this->rv_date_times );
		foreach ( $this->operations as $operation ) {
			$markup .= $this->get_the_hours_markup( $operation );
		}
		echo $markup;
		echo '</ul>';
	}

		/** Hard-Coded RV Hours
		 *
		 * @param string $title the Title of the Operation Hour
		 * @param array  $div_elements the days and open/close times of the operation
		 * @return string the HTML
		 */
	private function set_the_rv_hours( string $title, array $div_elements ):string {
		$markup = "<li class='hours-list__item hours-list-item'><span class='hours-list-item__title h4'>{$title}</span>";
		foreach ( $div_elements as $block ) {
			$markup .= "<div class='hours-list-item__day'><b>{$block['label']}:</b>&nbsp;<span class='hours-list-item__time--open'>{$block['open']}</span>&nbsp;&ndash;&nbsp;<span class='hours-list-item__time--close'>{$block['close']}</span></div>";
		}
		$markup .= '</li>';
		return $markup;
	}

		/** Loops over the ACF Repeater field and returns the markup
		 *
		 * @param array $operation the operational hour object
		 */
	private function get_the_hours_markup( array $operation ):string {
		$days            = array();
		$operation_title = esc_textarea( $operation['operation_title'] );
		$is_open         = $this->get_open_days( $operation );
		$markup          = '';
		$markup         .= "<li class='hours-list__item hours-list-item'><span class='hours-list-item__title h4'>{$operation_title}</span>";
		$combined_hours  = '';
		if ( $is_open['friday'] ) {
			$days            = array( 'Friday' );
			$combined_hours .= "<span class='hours-list-item__time--open'>{$operation['friday']["open"]}</span>&nbsp;&ndash;&nbsp;<span class='hours-list-item__time--close'>{$operation['friday']["close"]}</span>";
		}
		if ( $is_open['saturday'] ) {
			if ( $operation['saturday']['same_as_previous'] ) {
				array_push( $days, 'Saturday' );
			} else {
				if ( false === $is_open['friday'] ) {
					$days = array( 'Saturday' );
				}
				$sat_hours = "<div class='hours-list-item__day--saturday'><b>Saturday:</b> <span class='hours-list-item__time--open'>{$operation['saturday']["open"]}</span>&nbsp;&ndash;&nbsp;<span class='hours-list-item__time--close'>{$operation['saturday']["close"]}</span>";
			}
		}
		if ( $is_open['sunday'] ) {
			if ( $operation['sunday']['same_as_previous'] ) {
				array_push( $days, 'Sunday' );
			} else {
				$sun_hours = "<div class='hours-list-item__day--sunday'><b>Sunday:</b> <span class='hours-list-item__time--open'>{$operation['sunday']["open"]}</span>&nbsp;&ndash;&nbsp;<span class='hours-list-item__time--close'>{$operation['sunday']["close"]}</span>";
			}
		}
		if ( ! empty( $combined_hours ) ) {
			$day_label = join( ', ', $days );
			$markup   .= "<div class='hours-list-item__day'><b>{$day_label}:</b> " . $combined_hours;
			$markup   .= '</div>';
		}
		if ( ! empty( $sat_hours ) ) {
			$markup .= $sat_hours;
			$markup .= '</div>';
		}
		if ( ! empty( $sun_hours ) ) {
			$markup .= $sun_hours;
			$markup .= '</div>';
		}
		$markup .= '</li>';
		return $markup;
	}

		/**
		 * Checks which days are open and returns an associative array with $days as key and booleans as value
		 *
		 * @param array $operation the operation array
		 * @return array the booleans to extract
		 */
	private function get_open_days( array $operation ):array {
		extract( $operation );
		return array(
			'friday'   => ! empty( $friday['open'] ),
			'saturday' => true === $saturday['same_as_previous'] || ( ! empty( $saturday['open'] ) ),
			'sunday'   => true === $sunday['same_as_previous'] || ( ! empty( $sunday['open'] ) ),
		);
	}

}