<?php
/**
 * The Operational Hours Class
 *
 * @package ChoctawNation
 * @subpackage Events
 */

/** Operational Hours */
class Operational_Hours {
	/** The operations array
	 *
	 * @var array $operations
	 */
	private array $operations = array();

	/** The RV Hours Title
	 *
	 * @var string $rv_hours_title
	 */
	private $rv_hours_title = 'RV/Tent Gate Hours';


	/** Construct the class
	 *
	 * @param array $operations_field the Hours of Operations ACF Options field
	 */
	public function __construct( array $operations_field ) {
		$this->operations = $operations_field;
	}

	/** Public API to generate HTML
	 *
	 * @return void
	 */
	public function list_the_hours() {
		echo "<ul class='hours-list list-unstyled m-0 p-0'>";
		$markup  = '';
		$markup .= $this->set_the_rv_hours();
		foreach ( $this->operations as $index => $operation ) {
			$markup .= $this->get_the_hours_markup( $operation, $index );
		}
		echo $markup;
		echo '</ul>';
	}

	/**
	 * RV Hours
	 *
	 * @return string the HTML
	 */
	private function set_the_rv_hours(): string {
		if ( empty( get_field( 'rv_tent_hours', 'options' ) ) ) {
			return '';
		}
		$markup  = "<li class='p-2 p-lg-4 fs-6' id='rv-tent-hours'><h2 class='fs-5'>{$this->rv_hours_title}</h2>";
		$markup .= '<div>' . acf_esc_html( get_field( 'rv_tent_hours', 'options' ) ) . '</div>';
		$markup .= '</li>';
		return $markup;
	}

	/** Loops over the ACF Repeater field and returns the markup
	 *
	 * @param array $operation the operational hour object
	 * @param int   $index the index of the operation
	 * @return string the HTML
	 */
	private function get_the_hours_markup( array $operation, int $index ): string {
		$is_even         = 0 === $index % 2;
		$days            = array();
		$operation_title = esc_textarea( $operation['operation_title'] );
		$is_open         = $this->get_open_days( $operation );
		$markup          = '';
		$markup         .= "<li class='p-2 p-lg-4" . ( $is_even ? ' bg-tertiary' : '' ) . " fs-6'><h2 class='fs-5'>{$operation_title}</h2>";
		$combined_hours  = '';
		if ( $is_open['friday'] ) {
			$days            = array( 'Friday' );
			$combined_hours .= "<span class='fw-normal'>{$operation['friday']["open"]}</span>&nbsp;&ndash;&nbsp;<span class='fw-normal'>{$operation['friday']["close"]}</span>";
		}
		if ( $is_open['saturday'] ) {
			if ( $operation['saturday']['same_as_previous'] ) {
				array_push( $days, 'Saturday' );
			} else {
				if ( false === $is_open['friday'] ) {
					$days = array( 'Saturday' );
				}
				$sat_hours = "<div class='fw-bold'>Saturday: <span class='fw-normal'>{$operation['saturday']["open"]}</span>&nbsp;&ndash;&nbsp;<span class='fw-normal'>{$operation['saturday']["close"]}</span>";
			}
		}
		if ( $is_open['sunday'] ) {
			if ( $operation['sunday']['same_as_previous'] ) {
				array_push( $days, 'Sunday' );
			} else {
				$sun_hours = "<div class='fw-bold'>Sunday: <span class='fw-normal'>{$operation['sunday']["open"]}</span>&nbsp;&ndash;&nbsp;<span class='fw-normal'>{$operation['sunday']["close"]}</span>";
			}
		}
		if ( ! empty( $combined_hours ) ) {
			$day_label = join( ', ', $days );
			$markup   .= "<div class='fw-bold'>{$day_label}: " . $combined_hours;
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
	private function get_open_days( array $operation ): array {
		extract( $operation );
		return array(
			'friday'   => ! empty( $friday['open'] ),
			'saturday' => true === $saturday['same_as_previous'] || ( ! empty( $saturday['open'] ) ),
			'sunday'   => true === $sunday['same_as_previous'] || ( ! empty( $sunday['open'] ) ),
		);
	}
}
