<?php

/** Operational Hours */
class Operational_Hours {
	private array $operations = array();
	private array $days       = array( 'friday', 'saturday', 'sunday' );

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
		echo $this->get_the_hours_markup();
		echo '</ul>';
	}


	/** Loops over the ACF Repeater field and returns the markup */
	private function get_the_hours_markup() {
		foreach ( $this->operations as $operation ) {
			$operation_title = esc_textarea( $operation['operation_title'] );
			$is_open         = $this->get_open_days( $operation );
			$markup          = '';
			$markup         .= "<li class='hours-list__item hours-list-item'><span class='hours-list-item__title h4'>{$operation_title}</span>";
			if ( $is_open['friday'] ) {
				// add to $day arr
				// get the hours
			}
			if ( $is_open['saturday'] ) {
				if ( $operation['saturday']['same_as_previous'] ) {
					// add to $day arr
				} else {
					// get new hours
				}
			} else {
				continue;
			}
			if ( $is_open['sunday'] ) {
				if ( $operation['sunday']['same_as_previous'] ) {
					// add to $day arr
				} else {
					// get new hours
				}
			} else {
				continue;
			}

			// $day             = ucfirst( $key );
			// $markup         .= "<div class='hours-list-item__day--{$key}'>{$day}: <span class='hours-list-item__time--open'>{$operation[$key]["open"]}</span>&nbsp;&ndash;&nbsp;<span class='hours-list-item__time--close'>{$operation[$key]["close"]}</span></div>";

			// 4. return markup
			$markup .= '</li>';
		}
			return $markup;

	};
}

	/**
	 * Get the info and return the HTML for each operation
	 *
	 * @param array $operation an operational hour
	 * @returns string the HTML
	 */
private function display_operation_hours( array $operation ):string {
	$operation_title = esc_textarea( $operation['operation_title'] );
	$is_open         = $this->get_open_days( $operation );
	$markup          = '';
	$markup         .= "<li class='hours-list__item hours-list-item'><span class='hours-list-item__title h4'>{$operation_title}</span>";
	foreach ( $is_open as $key => $value ) {
		if ( $value ) {
			$markup .= $this->get_hours_by_day( $operation, $key );
		}
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
private function get_open_days( array $operation ): Open_Days {
	extract( $operation );
	$open_days           = new Open_Days();
	$open_days->friday   = ! empty( $friday['open'] );
	$open_days->saturday = true === $saturday['same_as_previous'] || ( ! empty( $saturday['open'] ) );
	$open_days->sunday   = true === $sunday['same_as_previous'] || ( ! empty( $sunday['open'] ) );
	return $open_days;
}

	/** Generate Hours by Day markup
	 *
	 * @param array  $operation the operation
	 * @param string $key the day to check open and close times against
	 */
private function get_hours_by_day( array $operation, string $key, array $days = null ): string {
	// var_dump( $operation );

	$day = ucfirst( $key );
	return "<div class='hours-list-item__day--{$key}'>{$day}: <span class='hours-list-item__time--open'>{$operation[$key]["open"]}</span>&nbsp;&ndash;&nbsp;<span class='hours-list-item__time--close'>{$operation[$key]["close"]}</span></div>";
}

}