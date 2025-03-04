<?php
/**
 * Hero Fields
 * Initial ACF Class with the Hero fields API built out.
 *
 * @package ChoctawNation
 * @subpackage ACF
 * @since 1.9
 */

namespace ChoctawNation\ACF;

/** API for the Hero Group field that gets loaded on every page. */
class Hero extends Generator {
	/** Whether there is a background image
	 *
	 * @var bool $has_background_image
	 */
	public bool $has_background_image;

	/** The headline
	 *
	 * @var string $headline
	 */
	private string $headline;

	/** The subheadline
	 *
	 * @var string $subheadline
	 */
	private string $subheadline;

	/** Whether there is a CTA
	 *
	 * @var bool $has_cta
	 */
	public bool $has_cta;

	/** The CTA array (link & text)
	 *
	 * @var array $cta
	 */
	private array $cta;

	// phpcs:ignore
	protected function init_props( array $acf ) {
		$this->headline    = get_the_title( $this->post_id );
		$this->subheadline = esc_textarea( $acf['subheadline'] );
		$this->has_cta     = $acf['has_cta'];
		if ( $this->has_cta ) {
			$this->set_the_cta( $acf );
		}
		$this->has_background_image = $acf['has_background_image'];
		if ( $this->has_background_image ) {
			$this->set_the_image( $acf['background_image'] );
		}
	}

	/** Sets the `$cta` property to the escaped ACF fields
	 *
	 * @param array $acf The ACF Link field array to sanitize
	 * @return void
	 */
	private function set_the_cta( array $acf ) {
		$this->cta = array(
			'link' => esc_url( $acf['cta_link'] ),
			'text' => esc_textarea( $acf['cta_text'] ),
		);
	}

	/** Returns the headline
	 *
	 * @return string
	 */
	public function get_the_headline(): string {
		return $this->headline;
	}

	/** Echoes the headline
	 *
	 * @return void
	 */
	public function the_headline() {
		echo $this->get_the_headline();
	}

	/** Check if Subheadline is empty
	 *
	 * @return bool
	 */
	public function has_subheadline(): bool {
		return ! empty( $this->subheadline );
	}

	/** Returns the subheadline
	 *
	 * @return string
	 */
	public function get_the_subheadline(): string {
		return $this->subheadline;
	}

	/** Echoes the subheadline
	 *
	 * @return void
	 */
	public function the_subheadline() {
		echo $this->get_the_subheadline();
	}

	/** Gets the Background Image source_url
	 *
	 * @return string
	 */
	public function get_the_image_src(): string {
		return $this->image->src;
	}

	/** Echoes the Image source url
	 *
	 * @return void
	 */
	public function the_image_src() {
		echo $this->get_the_image_src();
	}

	/**
	 * Wrapper for `ACF_Image->get_the_image()`.
	 * Generates the img element
	 *
	 * @param string $img_class the class to add
	 * @return string the HTML
	 */
	public function get_the_image( string $img_class = '' ): string {
		return $this->image->get_the_image( $img_class, false, true );
	}

	/**
	 * Echoes the img element
	 *
	 * @param string $img_class the class to add
	 * @return void
	 */
	public function the_image( string $img_class = '' ) {
		echo $this->get_the_image( $img_class );
	}

	/** Returns an anchor with the props set
	 *
	 * @param string $html_class [Optional] HTML classes to pass on
	 * @return string
	 */
	public function get_the_cta( string $html_class = '' ): string {
		return "<a href='{$this->cta['link']}' class='{$html_class}'>{$this->cta['text']}</a>";
	}

	/** Returns an anchor with the props set
	 *
	 * @param string $html_class [Optional] HTML classes to pass on
	 */
	public function the_cta( string $html_class = '' ) {
		echo $this->get_the_cta( $html_class );
	}
}