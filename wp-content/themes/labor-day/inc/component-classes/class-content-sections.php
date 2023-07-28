<?php // phpcs:ignore Squiz.Commenting.FileComment.Missing
/**
 * A Component Class that displays content a few different ways. All methods have an $args bypass and an $echo control where `false` returns the markup and `true` echoes the markup. The $args array also shows expected parameters.
 *
 * @param bool $acf class-wide control to use acf fields or standard WordPress field lookups (e.g. `get_field` vs `get_the_excerpt`). If true, excerpt will be set with `get_field('archive_content',$id)`. Defaults `true`
 *
 * @method two_col_text_and_media
 * @method hero_section
 * @method vertical_card
 *
 * @author KJ Roelke
 * @version 1.0.0
 */
class Content_Sections extends Content_Components {

	/**
	 * Gets the Hero `<section>` with class 'hero'. Optional Background Image or color.
	 *
	 * @param int   $post_id the post id.
	 * @param bool  $echo toggle return/echo output
	 * @param array ...$args Expects an associative array:
	 * ```
	 * $args = array(
	 * 'has_background_image' => bool,
	 * 'background_image' => ?string the URL for CSS `background-image`,
	 * 'headline' => string,
	 * 'subheadline' => ?string,
	 * 'has_cta' => bool,
	 * 'cta_link' => ?string the url
	 * );
	 * ```
	 */
	public function hero_section( int $post_id = null, $echo = true, array ...$args ) {
		if ( empty( $post_id ) ) {
			extract( $args );
		} else {
			$hero = get_field( 'hero', $post_id );
			extract( $hero );
		}
		$markup_start  = $has_background_image ? "<section class='hero w-100 py-5' style=\"background-image:url('{$background_image}')\">" : "<section class='hero w-100 py-5' style='background-color:var(--bs-secondary);'>";
		$markup_start .= "
        <div class='container'>
            <div class='row my-5'>
                <div class='col text-center py-5'>";
		$markup_inner  = $this->headline(
			$headline,
			false,
			array(
				'headline_element'    => 'h1',
				'headline_class'      => 'hero__headline headline mb-5',
				'subheadline_content' => $subheadline,
				'subheadline_class'   => 'hero__subheadline subheadline',
			)
		);

		if ( $has_cta ) {
			$markup_inner .= $this->cta_button(
				array(
					'text'       => $cta_text,
					'link'       => $cta_link,
					'html_class' => 'hero__btn btn__primary--fill mt-5',
				),
				false,
			);
		}
		$markup_end = '</div></div></div></section>';
		$markup     = "{$markup_start}{$markup_inner}{$markup_end}";
		if ( $echo ) {
			echo $markup; // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped
		} else {
			return $markup;
		}
	}

	/**
	 * Generate two-column layout with text and media
	 *
	 * @param array $options The options for the two-column layout.
	 *     @var string $headline        (required) The headline text
	 *     @var string $content         (required) The content text
	 *     @var string $content_wrapper The wrapper element for the content (default: 'p')
	 *     @var string $content_class   The CSS class for the content (default: 'text-content')
	 *     @var string|null $cta_text   The call-to-action button text (optional)
	 *     @var string|null $cta_link   The call-to-action button link (optional)
	 *     @var string $media_type      The type of media ('photo' or 'video') (default: 'photo')
	 *     @var bool $reverse           Whether to reverse the order of columns (default: false)
	 *     @var string|null $image_src  The image source URL (only used for 'photo' media_type) (optional)
	 * }
	 * @param bool  $echo Whether to echo or return the markup (default: true)
	 *
	 * @return string The markup for the two-column layout
	 */
	public function two_col_text_and_media( array $options, bool $echo = true ) {
		$default = array(
			'split'            => array( 6, 6 ),
			'headline'         => '',
			'headline_element' => 'h2',
			'headline_class'   => 'headline',
			'content'          => '',
			'content_wrapper'  => 'p',
			'content_class'    => 'text-content mb-5',
			'cta_text'         => null,
			'cta_link'         => null,
			'cta_external'     => false,
			'cta_class'        => 'cta__btn btn__fill--primary align-self-start',
			'media_type'       => 'photo',
			'reverse'          => false,
			'image'            => null,
			'image_src'        => get_theme_file_uri( '/images/placeholder.jpg' ),
			'image_alt'        => '',
		);

		$options = array_merge( $default, $options );

		extract( $options );

		$container_start = $reverse ? '<div class="row flex-row-reverse two-col">' : '<div class="row two-col">';
		$div_end         = '</div>';
		$col_start_1     = "<div class='col-lg-{$split[0]} two-col__media gx-5' data-aos='" . ( $reverse ? 'fade-left' : 'fade-right' ) . "'>";
		$col_start_2     = "<div class='col-lg-{$split[1]} two-col__content gx-5'>";
		$col_1_content   = '';

		if ( 'photo' === $media_type && $image ) {
			$col_1_content = "<figure class='two-col__media--container mb-md-0'>";
			if ( 'array' === gettype( $image ) ) {
				$srcset         = wp_get_attachment_image_srcset( $image['ID'] );
				$alt            = esc_textarea( $image['alt'] );
				$col_1_content .= empty( $alt ) ? "<img src='{$image['sizes']['medium_large']}' alt='' aria-hidden='true' srcset='{$srcset}' class='two-col__media--image' />" : "<img src='{$image['sizes']['medium_large']}' alt='{$alt}'  srcset='{$srcset}' class='two-col__media--image' />";
			} elseif ( 'string' === gettype( $image ) ) {
				$col_1_content .= $image;
			}
			$col_1_content .= '</figure>';
		} elseif ( 'video' === $media_type ) {
			$col_1_content = "<figure class='two-col__media--container'>Video!</figure>";
		}
		$headline_args = array(
			'headline_element'    => $headline_element,
			'headline_class'      => $headline_class,
			'subheadline_content' => $content,
			'subheadline_element' => $content_wrapper,
			'subheadline_class'   => $content_class,
		);

		$col_2_content = $this->headline( $headline, false, $headline_args );

		if ( ! empty( $cta_text ) ) {
			$btn_options = array(
				'text'        => $cta_text,
				'link'        => $cta_link,
				'is_external' => $cta_external,
				'html_class'  => $cta_class,
			);

			// TODO: #94 Make this better @kjroelke
			if ( '5K' === $headline ) {
				$col_2_content .= "<div class='row row-cols-1 row-cols-md-2 gap-md-3 flex-nowrap w-100'>" . $this->cta_button( $btn_options, false );
			} else {
				$col_2_content .= $this->cta_button( $btn_options, false );
			}
		}
		// TODO: #94 Make this better @kjroelke
		if ( '5K' === $headline ) {
			$col_2_content .= $this->cta_button(
				array(
					'text'        => 'PACE Members Apply Here',
					'link'        => 'https://forms.office.com/pages/responsepage.aspx?id=J5wXR8vx0kOwdHfxONpxRJKkvjrJDJJAud1v2q23KKtUOFhaNlE4NllINE9BOEpINENOMkkyUFhCUy4u',
					'is_external' => true,
					'html_class'  => 'btn__outline--primary registration-form__button flex-grow-1',
				),
				false
			) . '</div>';
		}
		$markup = "
        {$container_start}
            {$col_start_1}{$col_1_content}{$div_end}
            {$col_start_2}{$col_2_content}{$div_end}
        {$div_end}";

		if ( $echo ) {
			echo $markup; // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped
		} else {
			return $markup;
		}
	}

	/**
	 * Vertical Card Layout with an image. $args overrides the `headline` settings
	 *
	 * @param array $args Expects an associative array:
	 * ```php
	 * $headline_args = array(
	 * 'headline_element'        => ?string default "h2",
	 * 'headline_class'          => ?string default "vertical-card__title",
	 * 'subheadline_element'     => ?string default 'p');
	 * 'subheadline_class'       => ?string default 'vertical-card__excerpt');
	 * 'subheadline_content'     => ?string the subheadline content,
	 * ```
	 * @param bool  $echo toggle return / echo output
	 */
	public function vertical_card( array $args = array(), bool $echo = true, ) {
		$default       = array(
			'image_src'           => null,
			'image_alt'           => null,
			'srcset'              => '',
			'headline'            => '',
			'headline_element'    => 'h2',
			'subheadline_content' => '',
		);
		$headline_args = array(
			'headline_class'      => 'vertical-card__title',
			'subheadline_element' => 'div',
			'subheadline_class'   => 'vertical-card__excerpt',
		);

		$options = array_merge( $default, $headline_args, $args );
		extract( $options );
		$card_image        = "<figure class='vertical-card__image' data-aos='fade-up'><img src={$image_src} alt='{$image_alt}' srcset='{$srcset}' /></figure>";
		$card_text_content = "<div class='vertical-card__content'>{$this->headline($headline, false, $options)}</div>";
		$markup            = "<div class='vertical-card'>{$card_image}{$card_text_content}</div>";
		if ( $echo ) {
			echo $markup; // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped
		} else {
			return $markup;
		}
	}
}