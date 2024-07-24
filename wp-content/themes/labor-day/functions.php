<?php
/**
 * Should be pretty quiet in here besides requiring the appropriate files
 * Like style.css, this should really only be used for quick fixes with notes to refactor later.
 *
 * @since 1.0
 * @package ChoctawNation
 */

use ChoctawNation\Theme_Init;

// Init Theme.
require_once get_template_directory() . '/inc/theme/class-theme-init.php';
$init_theme = new Theme_Init();

/**
 * ==============================================================
 */

/** Register Service Worker for PWA Capability */
function register_service_worker() {
	wp_enqueue_script( 'service-worker', '/service-worker.js', array(), '1.0.1', false );
}
add_action( 'wp_enqueue_scripts', 'register_service_worker' );

/** make gravity forms available to Editor role **/
function add_gf_cap() {
    $role = get_role( 'editor' );
    $role->add_cap( 'gform_full_access' );
}
 add_action( 'admin_init', 'add_gf_cap' );