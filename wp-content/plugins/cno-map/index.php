<?php

/**
 * Plugin Name: CNO Map Plugin
 * Description: A map plugin built with React
 * Version: 1.0
 * Author: Choctaw Nation of Oklahoma
 * Author URI: https://choctawnation.com
 */

function cno_enqueue_plugin_scripts() {
	wp_enqueue_script('map-script', plugin_dir_url(__FILE__) . 'dist/App.js', false, true);
	wp_enqueue_style('map-style', plugin_dir_url(__FILE__) . 'dist/App.css');
}
add_action('wp_enqueue_scripts', 'cno_enqueue_plugin_scripts');


function cno_show_map() {
	echo '<div id="cno-map-app" style="display:flex"></div>';
}

add_shortcode('cno_show_react_map', 'cno_show_map');
