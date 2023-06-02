<?php
/**
 * A utilities file while dev is happening.
 */

define( 'lorem', 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet' );

/** Sets an Environment Variable */
function cno_set_environment() {
	$server_name = $_SERVER['SERVER_NAME'];

	if ( false !== strpos( $server_name, '.local' ) ) {
		$_ENV['CNO_ENV'] = 'dev';
	} elseif ( false !== strpos( $server_name, 'stg' ) ) {
		$_ENV['CNO_ENV'] = 'stage';
	} elseif ( false !== strpos( $server_name, 'choctawnation.com' ) || false !== strpos( $server_name, 'prod' ) ) {
		$_ENV['CNO_ENV'] = 'prod';
	} else {
		return;
	}
}

cno_set_environment();