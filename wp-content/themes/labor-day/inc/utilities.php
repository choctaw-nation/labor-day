<?php
/**
 * A utilities file while dev is happening.
 */

define( 'lorem', 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet' );


function cno_set_environment() {
    $server_name = $_SERVER['SERVER_NAME'];
    
    if ( false !== strpos($server_name, '.local' )) {
        $_ENV['CNO_ENV'] = 'dev';
    } elseif ( false !== strpos( $server_name, 'wpengine' ) ) {
        $_ENV['CNO_ENV'] = 'stage';
    } elseif ( false !== strpos( $server_name, 'choctawnation.com' ) ) {
        $_ENV['CNO_ENV'] = 'prod';
    } else {
        return;
    }
}

cno_set_environment();