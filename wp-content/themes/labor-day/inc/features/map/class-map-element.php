<?php
/**
 * Map Element
 *
 * @package ChoctawNation
 * @subpackage Map
 * @since 3.3.2
 */

namespace ChoctawNation\Map;

/**
 * Map Element
 */
class Map_Element {
	/**
	 * The ID of the element
	 *
	 * @var string $id
	 */
	public string $id;

	/**
	 * The label of the element
	 *
	 * @var string $label
	 */
	public string $label;

	/**
	 * Whether the element is checked
	 *
	 * @var bool $checked
	 */
	public bool $checked;

	/**
	 * The icon of the element
	 *
	 * @var ?string $icon
	 */
	public ?string $icon;

	/**
	 * Constructor
	 *
	 * @param array $args Arguments for the Map Element
	 */
	public function __construct( array $args ) {
		$this->check_required_args( $args );
		$this->id      = $args['id'];
		$this->label   = $args['label'];
		$this->checked = isset( $args['checked'] ) ? $args['checked'] : true;
		$this->icon    = $args['icon'] ?? null;
	}

	/**
	 * Checks for required arguments
	 *
	 * @param array $args Arguments to check
	 * @throws \InvalidArgumentException If a required argument is missing.
	 */
	private function check_required_args( array $args ) {
		$required_args = array( 'id', 'label' );
		foreach ( $required_args as $arg ) {
			if ( ! array_key_exists( $arg, $args ) ) {
				throw new \InvalidArgumentException( esc_textarea( "Missing required argument: {$arg}" ) );
			}
		}
	}
}
