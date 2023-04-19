<?php

/**
 * The helper functions to use
 * 
 * @since 1.0
 * 
 */


/**
 * Enqueues the page style.
 *
 * @param string $id The id you set in webpack.config.js.
 * @param array $deps Optional array of dependencies.
 */
function cno_enqueue_page_style(string $id, array $deps = array('main')) {
    wp_enqueue_style(
        $id,
        get_stylesheet_directory_uri() . "/dist/{$id}.css",
        $deps,
        filemtime(get_stylesheet_directory() . "/dist/{$id}.css")
    );
}

/**
 * Enqueues the page script.
 *
 * @param string $id The id you set in webpack.config.js.
 * @param array $deps Optional array of dependencies.
 */
function cno_enqueue_page_script(string $id, array $deps = array('main')) {
    $asset_file = get_stylesheet_directory() . "/dist/{$id}.asset.php";

    if (file_exists($asset_file)) {
        $asset = require $asset_file;

        wp_enqueue_script(
            $id,
            get_stylesheet_directory_uri() . "/dist/{$id}.js",
            $asset['dependencies'] ?? $deps,
            $asset['version'],
            true
        );
    } else {
        wp_enqueue_script(
            $id,
            get_stylesheet_directory_uri() . "/dist/{$id}.js",
            $deps,
            filemtime(get_stylesheet_directory() . "/dist/{$id}.js"),
            true
        );
    }
}

/**
 * Enqueues both the page style and script.
 *
 * @param string $id The id you set in webpack.config.js.
 * @param array $deps Associative array of dependencies for styles and scripts.
 */
function cno_enqueue_page_assets(string $id, array $deps = array()) {
    $default_deps = array(
        'styles' => array('main'),
        'scripts' => array('main'),
    );

    $deps = wp_parse_args($deps, $default_deps);

    cno_enqueue_page_style($id, $deps['styles']);
    cno_enqueue_page_script($id, $deps['scripts']);
}


/**
 * Take the pretty day (Friday, Saturday, Sunday) and returns the date
 * 
 * @param string $day Long, capitalized day
 * @return string Date as long month, single number (e.g. "September 1");
 */
function cno_get_the_date(string $day): string {
    if ('Friday' === $day) {
        $date = 'September 1';
    } elseif ('Saturday' === $day) {
        $date = 'September 2';
    } else {
        $date = 'September 3';
    }
    return $date;
}