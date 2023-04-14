<?php

/**
 * Functions, Hooks and/or Filters the theme needs to run.
 * 
 * @since 1.1
 */

# ========================
# Handle Styles & Scripts
# =======================

class CNO_THEME {
	function __construct() {
		add_action('wp_enqueue_scripts', array($this, 'enqueue_cno_scripts'));
		add_action('after_setup_theme', array($this, 'register_cno_menus'));
		add_theme_support('post-thumbnails');
		$this->disable_discussion();
		add_action('init', array($this, 'alter_post_types'));
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
		$this->remove_wordpress_styles(array('classic-theme-styles', 'wp-block-library', 'dashicons', 'global-styles'));
		// }
	}
	/**
	 * Provide an array of handles to dequeue 
	 */
	private function remove_wordpress_styles(array $handles) {
		foreach ($handles as $handle) wp_dequeue_style($handle);
	}

	function register_cno_menus() {
		register_nav_menus(array(
			'primary_menu' => __('Primary Menu', 'cno'),
			'mobile_menu' => __('Mobile Menu', 'cno'),
			'footer_menu'  => __('Footer Menu', 'cno'),
		));
	}
	public function alter_post_types() {
		$post_types = array("post", "page");
		foreach ($post_types as $post_type) $this->disable_post_type_support($post_type);
	}
	public function disable_discussion() {
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
	private function disable_post_type_support($post_type) {
		$supports = array('editor', 'comments', 'trackbacks', 'revisions', 'author');
		foreach ($supports as $support) {
			if (post_type_supports($post_type, $support)) remove_post_type_support($post_type, $support);
		}
	}
}