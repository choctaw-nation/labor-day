<?php

/**
 * the theme's functions.php file
 * 
 * @since 1.0
 * 
 */

/**
 * Provide an array of handles to dequeue 
 */
function remove_wordpress_styles(array $handles) {
    foreach ($handles as $handle) wp_dequeue_style($handle);
}
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
 * @param object $deps expects 2 arrays ("styles" and "scripts") with appropriate dependencies. 
 */
function enqueue_page_assets(string $id, array $deps) {
    if (empty($deps['styles'])) {
        enqueue_page_style($id);
    } else enqueue_page_style($id, $deps['styles']);
    if (empty($deps['scripts'])) {
        enqueue_page_script($id);
    } else enqueue_page_script($id, $deps['scripts']);
}

/**
 * Adds scripts with the appropriate dependencies
 */
function enqueue_cno_scripts() {

    // Get modification time. Enqueue files with modification date to prevent browser from loading cached scripts and styles when file content changes.

    $modified_styles = date('YmdHi', filemtime(get_stylesheet_directory() . '/dist/global.css'));
    $modified_scripts = date('YmdHi', filemtime(get_stylesheet_directory() . '/dist/global.js'));


    wp_enqueue_style('main', get_template_directory_uri() . '/dist/global.css', array(), $modified_styles);
    wp_enqueue_script('cno-script', get_template_directory_uri() . '/dist/global.js', array(), $modified_scripts, true);
    wp_localize_script('cno-script', 'cnoSiteData', array('rootUrl' => home_url()));

    // if (!is_admin_bar_showing()) {
    remove_wordpress_styles(array('classic-theme-styles', 'wp-block-library', 'dashicons', 'global-styles'));
    // }
}

add_action('wp_enqueue_scripts', 'enqueue_cno_scripts');



function register_cno_menus() {
    register_nav_menus(array(
        'primary_menu' => __('Primary Menu', 'cno_careers'),
        'mobile_menu' => __('Mobile Menu', 'cno_careers'),
        'footer_menu'  => __('Footer Menu', 'cno_careers'),
    ));
}

add_action('after_setup_theme', 'register_cno_menus');


function disable_discussion() {
    // Close comments on the front-end
    add_filter('comments_open', '__return_false', 20, 2);
    add_filter('pings_open', '__return_false', 20, 2);

    // Hide existing comments
    add_filter('comments_array', '__return_empty_array', 10, 2);

    // Remove comments page in menu
    add_action('admin_menu', function () {
        remove_menu_page('edit-comments.php');
    });

    // Remove comments links from admin bar
    add_action('init', function () {
        if (is_admin_bar_showing()) {
            remove_action('admin_bar_menu', 'wp_admin_bar_comments_menu', 60);
        }
    });
}
function disable_post_type_support($post_type) {
    $supports = array('editor', 'comments', 'trackbacks', 'revisions', 'author');
    foreach ($supports as $support) {
        if (post_type_supports($post_type, $support)) remove_post_type_support($post_type, $support);
    }
}
function alter_post_types() {
    disable_discussion();
    $post_types = array("post", "page");
    foreach ($post_types as $post_type) disable_post_type_support($post_type);
}

add_action('init', 'alter_post_types');