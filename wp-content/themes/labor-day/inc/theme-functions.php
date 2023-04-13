<?php

/**
 * The helper functions to use
 * 
 * @since 1.0
 * 
 */


/**
 * @param string $id the id you set in webpack.config.js
 */
function enqueue_page_style(string $id, array $deps = array('main')) {

    $src = get_stylesheet_directory_uri() . "/dist/{$id}.css";
    wp_enqueue_style($id, $src, $deps, false);
}
function enqueue_page_script(string $id, array $deps = array()) {
    $src = get_stylesheet_directory_uri() . "/dist/{$id}.js";
    wp_enqueue_script($id, $src, $deps, false, true);
}
/**
 * @param {array} $deps expects 2 arrays ("styles" and "scripts") with appropriate dependencies. 
 */
function enqueue_page_assets(string $id, array $deps) {
    if (empty($deps['styles'])) {
        enqueue_page_style($id);
    } else enqueue_page_style($id, $deps['styles']);
    if (empty($deps['scripts'])) {
        enqueue_page_script($id);
    } else enqueue_page_script($id, $deps['scripts']);
}
