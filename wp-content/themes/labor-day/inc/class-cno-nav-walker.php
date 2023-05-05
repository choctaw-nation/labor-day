<?php // phpcs:ignore Squiz.Commenting.FileComment.Missing
/**
 * CNO Nav Walker
 * based on Bootscore's Navwalker
 *
 * @link https://github.com/bootscore/bootscore/blob/main/inc/class-bootstrap-5-navwalker.php
 */
class CNO_Nav_Walker extends Walker_Nav_Menu {
	private $current_item;
	private $dropdown_menu_alignment_values = array(
		'dropdown-menu-start',
		'dropdown-menu-end',
		'dropdown-menu-sm-start',
		'dropdown-menu-sm-end',
		'dropdown-menu-md-start',
		'dropdown-menu-md-end',
		'dropdown-menu-lg-start',
		'dropdown-menu-lg-end',
		'dropdown-menu-xl-start',
		'dropdown-menu-xl-end',
		'dropdown-menu-xxl-start',
		'dropdown-menu-xxl-end',
	);

	function start_lvl( &$output, $depth = 0, $args = null ) {
		$dropdown_menu_class[] = 'navbar__sub-menu sub-menu';
		foreach ( $this->current_item->classes as $class ) {
			if ( in_array( $class, $this->dropdown_menu_alignment_values ) ) {
				$dropdown_menu_class[] = $class;
			}
		}
		$indent  = str_repeat( "\t", $depth );
		$submenu = ( $depth > 0 ) ? ' navbar__sub-menu' : '';
		$output .= "\n$indent<ul class=\"dropdown-menu$submenu " . esc_attr( implode( ' ', $dropdown_menu_class ) ) . " depth_$depth\">\n";
	}

	function start_el( &$output, $item, $depth = 0, $args = null, $id = 0 ) {
		$this->current_item = $item;

		$indent = ( $depth ) ? str_repeat( "\t", $depth ) : '';

		$li_attributes = '';
		$class_names   = $value = '';

		$classes = empty( $item->classes ) ? array() : (array) $item->classes;

		$classes[] = ( $args->walker->has_children ) ? 'dropdown' : '';
		$classes[] = 'navbar__menu-item';
		$classes[] = 'navbar__menu-item--' . $item->ID;
		if ( $depth && $args->walker->has_children ) {
			$classes[] = 'dropdown-menu dropdown-menu-end';
		}

		if ( $depth > 0 ) {
			$classes[] = 'sub-menu__menu-item';
		}

		$class_names = join( ' ', apply_filters( 'nav_menu_css_class', array_filter( $classes ), $item, $args ) );
		$class_names = ' class="' . esc_attr( $class_names ) . '"';

		$id = apply_filters( 'nav_menu_item_id', 'menu-item-' . $item->ID, $item, $args );
		$id = strlen( $id ) ? ' id="' . esc_attr( $id ) . '"' : '';

		$output .= $indent . '<li ' . $id . $value . $class_names . $li_attributes . '>';

		$attributes  = ! empty( $item->attr_title ) ? ' title="' . esc_attr( $item->attr_title ) . '"' : '';
		$attributes .= ! empty( $item->target ) ? ' target="' . esc_attr( $item->target ) . '"' : '';
		$attributes .= ! empty( $item->xfn ) ? ' rel="' . esc_attr( $item->xfn ) . '"' : '';
		$attributes .= ! empty( $item->url ) ? ' href="' . esc_attr( $item->url ) . '"' : '';

		$active_class   = ( $item->current || $item->current_item_ancestor || in_array( 'current_page_parent', $item->classes, true ) || in_array( 'current-post-ancestor', $item->classes, true ) ) ? 'active' : '';
		$nav_link_class = ( $depth > 0 ) ? 'sub-menu__menu-item--link' : 'navbar__menu-item--link ';
		$attributes    .= ( $args->walker->has_children ) ? ' class="' . $nav_link_class . $active_class . ' dropdown-toggle" aria-haspopup="true" aria-expanded="false"' : ' class="' . $nav_link_class . $active_class . '"';

		$item_output  = $args->before;
		$item_output .= '<a' . $attributes . '>';
		$item_output .= $args->link_before . apply_filters( 'the_title', $item->title, $item->ID ) . $args->link_after;
		$item_output .= '</a>';
		$item_output .= $args->after;

		$output .= apply_filters( 'walker_nav_menu_start_el', $item_output, $item, $depth, $args );
	}
}
