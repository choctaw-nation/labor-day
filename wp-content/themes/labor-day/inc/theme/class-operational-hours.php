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

	/** Info from client:
	 * Wednesday 8:00 am - 8:00 pm
	 * Thursday thru Sat 8:00 am - 11:00 pm
	 * Sunday 10:00 am - 10:00 pm
	 *
	 * @var array $rv_date_times
	 */
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

	/** Public API to generate HTML
	 *
	 * @return void
	 */
	public function list_the_hours() {
		echo "<ul class='hours-list list-unstyled m-0 p-0'>";
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
	private function set_the_rv_hours( string $title, array $div_elements ): string {
		$markup = "<li class='hours-list-item p-2 p-lg-4'><span class='hours-list-item__title h4 fs-5'>{$title}</span>";
		foreach ( $div_elements as $block ) {
			$markup .= "<div class='hours-list-item__day fw-bold'>{$block['label']}:&nbsp;<span class='hours-list-item__time--open fw-normal'>{$block['open']}</span>&nbsp;&ndash;&nbsp;<span class='hours-list-item__time--close fw-normal'>{$block['close']}</span></div>";
		}
		$markup .= '</li>';
		return $markup;
	}

	/** Loops over the ACF Repeater field and returns the markup
	 *
	 * @param array $operation the operational hour object
	 * @return string the HTML
	 */
	private function get_the_hours_markup( array $operation ): string {
		$days            = array();
		$operation_title = esc_textarea( $operation['operation_title'] );
		$is_open         = $this->get_open_days( $operation );
		$markup          = '';
		$markup         .= "<li class='hours-list-item p-2 p-lg-4'><span class='hours-list-item__title h4 fs-5'>{$operation_title}</span>";
		$combined_hours  = '';
		if ( $is_open['friday'] ) {
			$days            = array( 'Friday' );
			$combined_hours .= "<span class='hours-list-item__time--open fw-normal'>{$operation['friday']["open"]}</span>&nbsp;&ndash;&nbsp;<span class='hours-list-item__time--close fw-normal'>{$operation['friday']["close"]}</span>";
		}
		if ( $is_open['saturday'] ) {
			if ( $operation['saturday']['same_as_previous'] ) {
				array_push( $days, 'Saturday' );
			} else {
				if ( false === $is_open['friday'] ) {
					$days = array( 'Saturday' );
				}
				$sat_hours = "<div class='hours-list-item__day--saturday fw-bold'>Saturday: <span class='hours-list-item__time--open fw-normal'>{$operation['saturday']["open"]}</span>&nbsp;&ndash;&nbsp;<span class='hours-list-item__time--close fw-normal'>{$operation['saturday']["close"]}</span>";
			}
		}
		if ( $is_open['sunday'] ) {
			if ( $operation['sunday']['same_as_previous'] ) {
				array_push( $days, 'Sunday' );
			} else {
				$sun_hours = "<div class='hours-list-item__day--sunday fw-bold'>Sunday: <span class='hours-list-item__time--open fw-normal'>{$operation['sunday']["open"]}</span>&nbsp;&ndash;&nbsp;<span class='hours-list-item__time--close fw-normal'>{$operation['sunday']["close"]}</span>";
			}
		}
		if ( ! empty( $combined_hours ) ) {
			$day_label = join( ', ', $days );
			$markup   .= "<div class='hours-list-item__day fw-bold'>{$day_label}: " . $combined_hours;
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
