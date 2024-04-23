<?php
/**
 * Plugin Name: CNO Labor Day Events
 * Description: A simple events plugin, specific to the Labor Day site.
 * Author: Choctaw Nation of Oklahoma
 * Author URI: https://www.choctawnation.com
 * Version: 2.0.0
 * Requires at least: 6.0
 * Requires PHP: 8.0
 * Text Domain: cno
 * Requires Plugins: advanced-custom-fields-pro, relevanssi
 *
 * @package CNOLaborDay
 * @subpackage Events
 */

use CNOLaborDay\Events\Plugin_Loader;

if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly.
}
require plugin_dir_path( __FILE__ ) . '/inc/class-plugin-loader.php';

$cno_events_plugin = new Plugin_Loader();

register_activation_hook( __FILE__, array( $cno_events_plugin, 'activate' ) );
register_deactivation_hook( __FILE__, array( $cno_events_plugin, 'deactivate' ) );
