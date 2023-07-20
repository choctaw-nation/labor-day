<?php

/** Operational Hours */
class Operational_Hours {
	private array $operations = array();

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
		$markup = '';
		foreach ( $this->operations as $operation ) {
			$markup .= $this->get_the_hours_markup( $operation );
		}
		echo $markup;
		echo '</ul>';
	}


	/** Loops over the ACF Repeater field and returns the markup
	 *
	 * @param array $operation the operational hour object
	 */
	private function get_the_hours_markup( array $operation ) {
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
				$days      = array( 'Saturday' );
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
		$day_label = join( ', ', $days );
		$markup   .= "<div class='hours-list-item__day'><b>{$day_label}:</b> " . $combined_hours;
		$markup   .= '</div>';
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