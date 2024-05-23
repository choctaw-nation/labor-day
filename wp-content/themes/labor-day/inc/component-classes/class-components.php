<?php
/**
 * Component Classes
 *
 * @package ChoctawNation
 * @subpackage Content
 * @since 1.0.
 */

namespace ChoctawNation\Content;

/**
 * A Component Class that displays content a few different ways. All methods have an $args bypass and an $echo control where `false` returns the markup and `true` echoes the markup. The $args array also shows expected parameters.
 *
 * @method void headline(string $headline, bool $echo = true, array ...$args) A headline element that has lots of optional parameters in the $args array.
 * @method void cta_button(array $options, bool $echo = true) Generates an `<a>` or `<button>` based on whether or not a $link is passed. Recommended use with named parameters for simple configuration.
 * @method void bulleted_list(array $list_items, array $args = array(), bool $echo = true) Renders a ul/ol of list items
 *
 * @version 1.0.0
 * @since 1.0.0
 */
class Components {

	/**
	 * A headline element that has lots of optional parameters in the $args array.
	 *
	 * @param string $headline the headline text.
	 * @param bool   $echo toggle return / echo output
	 * @param array  ...$args Pass optional customizations
	 *  ```php
	 *  $args = array(
	 *      'headline_element'    => ?string default "h2",
	 *      'headline_class'      => ?string default "headline",
	 *      'subheadline_element' => ?string default 'span');
	 *      'subheadline_class'   => ?string default 'subheadline');
	 *      'subheadline_content' => ?string the subheadline content,
	 *  ```
	 */
	public function headline( string $headline, bool $echo = true, array ...$args ) { // phpcs:ignore Universal.NamingConventions.NoReservedKeywordParameterNames.echoFound
		$default = array(
			'headline_element'    => 'h2',
			'headline_class'      => 'headline',
			'subheadline_element' => 'span',
			'subheadline_class'   => 'subheadline',
			'subheadline_content' => '',
		);

		$options = array_merge( $default, ...$args );
		extract( $options );

		$markup = "<{$headline_element} class='{$headline_class}'>{$headline}</{$headline_element}>";
		if ( ! empty( $subheadline_content ) ) {
			$markup .= "<{$subheadline_element} class='{$subheadline_class}'>{$subheadline_content}</{$subheadline_element}>";
		}
		if ( $echo ) {
			echo $markup; // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped
		} else {
			return $markup;
		}
	}


	/**
	 *  Generates an `<a>` or `<button>` based on whether or not a $link is passed. Recommended use with named parameters for simple configuration.
	 *
	 * @param array $options {
	 *
	 *      @var string $text         The button text
	 *      @var string $link         The button href
	 *      @var string $html_class   btn classes
	 *      @var bool $is_external    Is the link external?
	 * }
	 * @param bool  $echo Whether to echo or return the markup (default: true)
	 */
	public function cta_button( array $options, bool $echo = true ) { // phpcs:ignore Universal.NamingConventions.NoReservedKeywordParameterNames.echoFound
		$default = array(
			'text'        => 'Learn More',
			'link'        => '',
			'html_class'  => 'btn__primary--fill',
			'is_external' => false,
		);
		$options = array_merge( $default, $options );

		extract( $options );

		if ( empty( $link ) ) {
			$markup = "<button class='{$html_class}'>{$text}</button>";
		} else {
			$markup = ( $is_external ) ? "<a href='{$link}' target='_blank' rel='noopener noreferrer' class='cta__btn {$html_class}'>{$text}</a>" : "<a href='{$link}' class='{$html_class}'>{$text}</a>";
		}

		if ( $echo ) {
			echo $markup; // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped
		} else {
			return $markup;
		}
	}

	/**
	 * Renders a ul/ol of list items
	 *
	 * @param array $list_items the array of strings to become the `<li>`s
	 * @param array $args the arguments to pass.
	 *      'item_class' => string the class to set on each list item
	 *      'list_type'  => string the type of list to render, "ul" or "ol"
	 *      'list_class' => string the class to set on the list itself
	 * @param bool  $echo whether to `echo` or `return` the markup
	 */
	public function bulleted_list( array $list_items, array $args = array(), bool $echo = true ) { // phpcs:ignore Universal.NamingConventions.NoReservedKeywordParameterNames.echoFound
		$default = array(
			'item_class' => '',
			'list_type'  => 'ul',
			'list_class' => '',
		);
		$options = array_merge( $default, $args );

		extract( $options );
		$markup = empty( $list_class ) ? "<{$list_type}>" : "<{$list_type} class='{$list_class}'>";
		foreach ( $list_items as $item ) {
			$markup .= empty( $item_class ) ? "<li>{$item}</li>" : "<li class='{$item_class}'>{$item}</li>";
		}
		$markup .= "</{$list_type}>";
		if ( $echo ) {
			echo $markup; // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped
		} else {
			return $markup;
		}
	}
}
