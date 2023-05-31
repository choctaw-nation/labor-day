<?php
/**
 * A utilities file while dev is happening.
 */

define( 'lorem', 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet' );


function cno_set_environment() {
    $serverName = $_SERVER['SERVER_NAME'];
    
    if (strpos($serverName, '.local') !== false) {
        $_ENV['DEV'] = true;
    } elseif (strpos($serverName, 'wpengine') !== false) {
        $_ENV['STAGE'] = true;
    } elseif (strpos($serverName, 'choctawnation.com') !== false) {
        $_ENV['PROD'] = true;
    } else {
        return;
    }
}

cno_set_environment();