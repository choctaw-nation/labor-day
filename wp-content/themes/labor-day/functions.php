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

/** Make Gravity Forms available to Editor role **/
function add_gf_cap() {
	$role = get_role( 'editor' );
	$role->add_cap( 'gform_full_access' );
}
add_action( 'admin_init', 'add_gf_cap' );
