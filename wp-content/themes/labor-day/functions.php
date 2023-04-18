<?php

/**
 * Should be pretty quiet in here besides requiring the appropriate files
 * Like style.css, this should really only be used for quick fixes with notes to refactor later.
 * 
 * @since 1.0
 */

require WPMU_PLUGIN_DIR . '/advanced-custom-fields-pro/acf.php';
require WPMU_PLUGIN_DIR . '/initial-acf-fields.php';
require_once get_template_directory() . '/inc/class-theme-init.php';
require_once get_template_directory() . '/inc/class-cno-nav-walker.php';
require_once get_template_directory() . '/inc/theme-functions.php';
require_once get_template_directory() . '/inc/component-classes/class-content-sections.php';
require_once get_template_directory() . '/inc/utilities.php';
$init_theme = new CNO_THEME();
