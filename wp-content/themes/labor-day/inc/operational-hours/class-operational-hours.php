<?php
/** Operational Hours */
class Operational_Hours {
	private $operations = array();
	private $days       = array( 'friday', 'saturday', 'sunday' );

	/** Construct the class
	 *
	 * @param array $operations_field the Hours of Operations ACF Options field
	 */
	public function __construct( array $operations_field ) {
		$this->operations = $operations_field;
		// usort( $this->hours, array( $this, 'compare_hours' ) );
	}

	public function list_the_hours() {
		echo "<ul class='hours-list'>";
		var_dump( $this->operations );
		foreach ( $this->operations as $operation ) {
			$operation_title = esc_textarea( $operation['operation_title'] );
			$is_open         = $this->get_open_days( $operation );
			$markup          = '';
			$markup         .= "<li class='hours-list__item hours-list-item'><span class='hours-list-item__title h4'>{$operation_title}</span>";

			// loop logic

			// 1. get friday hours markup || 1a. add 'Friday' to $days
			// 2. if Sat/Sun same as previous, add day to $days, else get hours markup
			// 3. repeat step 2

			// $day             = ucfirst( $key );
			// $markup         .= "<div class='hours-list-item__day--{$key}'>{$day}: <span class='hours-list-item__time--open'>{$operation[$key]["open"]}</span>&nbsp;&ndash;&nbsp;<span class='hours-list-item__time--close'>{$operation[$key]["close"]}</span></div>";

			// 4. return markup
			$markup .= '</li>';
			return $markup;

		};
		echo '</ul>';
	}

	/**
	 * Get the info and return the HTML for each operation
	 *
	 * @param array $operation an operational hour
	 * @returns string the HTML
	 */
	private function display_operation_hours( array $operation ):string {
		$operation_title = esc_textarea( $operation['operation_title'] );
		// $is_open         = $this->get_open_days( $operation );
		$markup  = '';
		$markup .= "<li class='hours-list__item hours-list-item'><span class='hours-list-item__title h4'>{$operation_title}</span>";
		foreach ( $is_open as $key => $value ) {
			if ( $value ) {
				$markup .= $this->get_hours_by_day( $operation, $key );
			}
		}
			$markup .= '</li>';
		return $markup;
	}

	/**
	 * Checks which days are open and returns an array with booleans
	 *
	 * @param array $operation the operation array
	 * @return array the booleans to extract
	 */
	private function get_open_days( array $operation ): array {
		extract( $operation );
		return array(
			'friday'   => ! empty( $friday['open'] ),
			'saturday' => true === $saturday['same_as_previous'] || ( ! empty( $saturday['open'] ) ),
			'sunday'   => true === $sunday['same_as_previous'] || ( ! empty( $sunday['open'] ) ),
		);
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