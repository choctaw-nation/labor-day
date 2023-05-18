<?php
/**
 * Should be pretty quiet in here besides requiring the appropriate files
 * Like style.css, this should really only be used for quick fixes with notes to refactor later.
 *
 * @since 1.0
 * @package ChoctawNation
 */

// Init Theme.
require_once get_template_directory() . '/inc/class-cno-theme.php';
$init_theme = new CNO_THEME();

/**
 * ==============================================================
 */

/** Register Service Worker for PWA Capability */
function register_service_worker() {
	// phpcs:ignore
	wp_register_script( 'service-worker', '/service-worker.js' );
	wp_enqueue_script( 'service-worker' );
}
add_action( 'wp_enqueue_scripts', 'register_service_worker' );

