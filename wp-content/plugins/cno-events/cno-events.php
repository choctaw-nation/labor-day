<?php
/**
 * Plugin Name: CNO Labor Day Events
 * Plugin URI: https://github.com/choctaw-nation/labor-day/tree/main/wp-content/plugins/cno-events
 * Description: A simple events plugin, specific to the Labor Day site.
 * Author: Choctaw Nation of Oklahoma
 * Author URI: https://www.choctawnation.com
 * Version: 2.0.1
 * Requires at least: 6.0
 * Tested up to: 6.5.2
 * Requires Plugins: advanced-custom-fields-pro
 * Requires PHP: 8.1
 * License: GPL-3.0-or-later
 * License URI: https://www.gnu.org/licenses/gpl-3.0.html
 * Text Domain: cno
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