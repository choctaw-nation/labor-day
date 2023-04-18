<?php

/**
 * CNO Nav Walker
 * Adds BEM classes
 * @since 1.2
 * @author KJ Roelke
 */

class CNO_Nav_Walker extends Walker_Nav_Menu {
	function start_lvl(&$output, $depth = 0, $args = array()) {
		$indent = str_repeat("\t", $depth);
		$classes = $depth === 0 ? 'sub-menu navbar__sub-menu dropdwn-menu' : 'sub-menu';
		$output .= "\n$indent<ul class=\"$classes\">\n";
	}

	function start_el(&$output, $item, $depth = 0, $args = array(), $id = 0) {
		$indent = ($depth) ? str_repeat("\t", $depth) : '';

		$classes = empty($item->classes) ? array() : (array) $item->classes;
		$classes[] = 'menu-item-' . $item->ID;
		$has_children = $args->walker->has_children;
		if ($depth && in_array('current-menu-item', $classes)) {
			$classes[] = 'sub-menu__menu-item--active';
		}
		if (0 === $depth) {
			$classes[] = 'navbar__menu-item';
			if ($has_children) {
				$classes[] = 'dropdown';
			}
		}
		$output .= $indent . '<li class="' . implode(' ', $classes) . '">';

		$atts = array();
		$atts['title'] = !empty($item->attr_title) ? $item->attr_title : '';
		$atts['target'] = !empty($item->target) ? $item->target : '';
		$atts['rel'] = !empty($item->xfn) ? $item->xfn : '';
		$atts['href'] = !empty($item->url) ? $item->url : '';
		$atts['data-bs-toggle'] = $has_children ? 'dropdown' : '';
		$atts['aria-haspopup'] = $has_children ? 'true' : '';
		$atts['aria-expanded'] = 'false';

		$atts = apply_filters('nav_menu_link_attributes', $atts, $item, $args, $depth);

		$attributes = '';
		foreach ($atts as $attr => $value) {
			if (!empty($value)) {
				$value = ('href' === $attr) ? esc_url($value) : esc_attr($value);
				$attributes .= ' ' . $attr . '="' . $value . '"';
			}
		}

		$item_output = $args->before;
		$item_output .= '<a class="' . ($depth ? 'sub-menu__menu-item--link dropdown-item' : 'navbar__menu-item--link dropdown-toggle') . '"' . $attributes . '>';
		$item_output .= $args->link_before . apply_filters('the_title', $item->title, $item->ID) . $args->link_after;
		$item_output .= '</a>';
		$item_output .= $args->after;

		$output .= apply_filters('walker_nav_menu_start_el', $item_output, $item, $depth, $args);
	}
}
