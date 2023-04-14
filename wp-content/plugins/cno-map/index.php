<?php

/**
 * Plugin Name: CNO Map Plugin
 * Description: A map plugin built with React
 * Version: 1.0
 * Author: Choctaw Nation of Oklahoma
 * Author URI: https://choctawnation.com
 * * Requires at least: 6.0
 * Requires PHP: 8.0
 * Text Domain: cno
 */
if (!defined('ABSPATH')) {
	exit; // Exit if accessed directly.
}
function cno_enqueue_plugin_scripts() {
	wp_enqueue_script('map-script', plugin_dir_url(__FILE__) . 'dist/App.js', false, true);
	wp_enqueue_style('map-style', plugin_dir_url(__FILE__) . 'dist/App.css');
}

function cno_show_map() {
	echo '<div id="cno-map-app" style="display:flex"></div>';
	cno_enqueue_plugin_scripts();
}
add_shortcode('cno_show_react_map', 'cno_show_map');