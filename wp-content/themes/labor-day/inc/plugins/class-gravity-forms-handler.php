<?php
/**
 * Gravity Forms Handler
 *
 * @package ChoctawNation
 * @subpackage Gravity Forms
 */

namespace ChoctawNation\Plugins;

/**
 * Gravity Forms Handler
 */
class Gravity_Forms_Handler {
	/**
	 * Add Bootstrap classes to Gravity Forms buttons.
	 *
	 * @param string $button The button HTML.
	 * @return string The modified button HTML.
	 */
	public function handle_additional_gform_button_classes( string $button ): string {
		$dom = new \DOMDocument();
		$dom->loadHTML( $button );
		$input   = $dom->getElementsByTagName( 'input' )->item( 0 );
		$classes = $input->getAttribute( 'class' );
		$classes = 'btn btn-secondary';
		$input->setAttribute( 'class', $classes );
		return $dom->saveHtml( $input );
	}

	/**
	 * Dequeue Gravity Forms Recaptcha Scripts where possible.
	 * The blocks should enqueue it when needed.
	 */
	public function dequeue_recaptcha_scripts() {
		if ( is_admin() ) {
			return;
		}
		if ( is_home() || is_front_page() || is_archive() ) {
			wp_dequeue_script( 'gforms_recaptcha_recaptcha' );
			wp_dequeue_script( 'gforms_recaptcha_frontend' );
		}
	}
}