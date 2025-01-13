<?php
/**
 * The ACF Event class
 *
 * @package ChoctawNation
 * @subpackage Events
 */

namespace ChoctawNation\ACF;

use DateTime;

/**
 * The class for creating event objects
 */
class Event {
	/**
	 * The post_id associated with the acf fields
	 *
	 * @var int $id
	 */
	protected int $id;

	/**
	 * The event date
	 *
	 * @var string $day
	 */
	protected string $day;

	/**
	 * The event start time
	 *
	 * @var string $start_time
	 */
	protected string $start_time;

	/**
	 * The event end time
	 *
	 * @var ?string $end_time
	 */
	protected ?string $end_time;

	/**
	 * The event description
	 *
	 * @var ?string $description
	 */
	protected ?string $description;

	/**
	 * A portrait oriented image
	 *
	 * @var ?Image $portrait_image
	 */
	private ?Image $portrait_image;

	/**
	 * The constructor for the Event class
	 *
	 * @param int|\WP_Post $post_id the post_id associated with the acf fields
	 */
	public function __construct( int|\WP_Post $post_id ) {
		if ( $post_id instanceof \WP_Post ) {
			$this->id = $post_id->ID;
		} else {
			$this->id = $post_id;
		}
		$this->description    = empty( get_field( 'description', $post_id ) ) ? null : acf_esc_html( get_field( 'description', $post_id ) );
		$this->portrait_image = get_field( 'portrait_orientation_photo', $post_id ) ? new Image( get_field( 'portrait_orientation_photo', $post_id ) ) : null;
		$this->init_props( get_field( 'info', $post_id ) );
	}

	/**
	 * Sets class props to ACF fields
	 *
	 * @param array $acf the acf array
	 */
	private function init_props( $acf ) {
		$this->day        = $acf['day'];
		$this->start_time = $acf['start_time'];
		$this->end_time   = empty( $acf['end_time'] ) ? null : $acf['end_time'];
	}

	/**
	 * Returns the post_id associated with the acf fields
	 *
	 * @return int
	 */
	public function get_the_id(): int {
		return $this->id;
	}


	/**
	 * Echoes the post_id associated with the acf fields
	 *
	 * @return void
	 */
	public function the_id(): void {
		echo $this->get_the_id();
	}

	/**
	 * Returns the event title
	 *
	 * @return string
	 */
	public function get_the_title(): string {
		return esc_textarea( get_the_title( $this->get_the_id() ) );
	}

	/**
	 * Echoes the event title
	 *
	 * @return void
	 */
	public function the_title(): void {
		echo $this->get_the_title();
	}

	/**
	 * Returns the event date
	 *
	 * @return string
	 */
	public function get_the_day(): string {
		return $this->day;
	}

	/**
	 * Echoes the event date
	 *
	 * @return void
	 */
	public function the_day(): void {
		echo $this->get_the_day();
	}

	/**
	 * Returns the event date
	 *
	 * @param string $format the date format. Default format is 'M j l' or 'Sep 1 Sunday'
	 * @return string
	 */
	public function get_the_date( string $format = 'M j l' ): string {
		$labor_day_dates = get_field( 'labor_day_dates', 'options' );
		$date_map        = array(
			'Friday'   => $labor_day_dates['friday'],
			'Saturday' => $labor_day_dates['saturday'],
			'Sunday'   => $labor_day_dates['sunday'],
		);
		if ( array_key_exists( $this->get_the_day(), $date_map ) ) {
			$date = $date_map[ $this->get_the_day() ];
		} else {
			$date = '';
		}
		$date_string = new DateTime( $date );
		return $date_string->format( $format );
	}

	/**
	 * Echoes the event date
	 *
	 * @param string $format the date format. Default format is 'M j l' or 'Sep 1 Sunday'
	 * @return void
	 */
	public function the_date( string $format = 'M j l' ): void {
		echo $this->get_the_date( $format );
	}

	/**
	 * Returns the event start time
	 *
	 * @return string
	 */
	public function get_the_start_time(): string {
		return $this->start_time;
	}

	/**
	 * Echoes the event start time
	 *
	 * @return void
	 */
	public function the_start_time(): void {
		echo $this->get_the_start_time();
	}

	/**
	 * Returns the event end time
	 *
	 * @return ?string
	 */
	public function get_the_end_time(): ?string {
		return $this->end_time;
	}

	/**
	 * Echoes the event end time
	 *
	 * @return void
	 */
	public function the_end_time(): void {
		echo $this->get_the_end_time();
	}

	/**
	 * Returns the event times
	 *
	 * @return string
	 */
	public function get_the_times(): string {
		$start_time = substr( $this->get_the_start_time(), 0, -2 );
		$times      = $this->get_the_start_time();
		if ( ! $this->get_the_end_time() ) {
			return $times;
		}

		$end_time       = substr( $this->get_the_end_time(), 0, -2 );
		$start_meridian = substr( $times, -2 );
		$end_meridian   = substr( $this->get_the_end_time(), -2 );

		if ( $start_meridian === $end_meridian ) {
			$times = "{$start_time} &ndash; {$end_time} {$end_meridian}";
		} else {
			$times = "{$start_time} {$start_meridian} — {$end_time} {$end_meridian}";
		}

		return esc_html( $times );
	}

	/**
	 * Echoes the event times
	 *
	 * @return void
	 */
	public function the_times(): void {
		echo $this->get_the_times();
	}

	/**
	 * Returns the event description
	 *
	 * @return ?string
	 */
	public function get_description(): ?string {
		return $this->description;
	}

	/**
	 * Echoes the event description
	 *
	 * @return void
	 */
	public function the_description(): void {
		echo $this->get_description();
	}

	/**
	 * Returns the portrait image
	 *
	 * @param string $img_class the class to add to the image
	 * @return string
	 */
	public function get_portrait_image( $img_class = '' ): string {
		return $this->portrait_image->get_the_image( $img_class );
	}
}