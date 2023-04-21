<?php

/**
 * Functions, Hooks and/or Filters the theme needs to run.
 * 
 * NOTE: this branches from the initial theme.
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
		add_action('init', array($this, 'register_taxonomies'));
	}
	function register_taxonomies() {
		if (!post_type_exists('events')) return;
		register_taxonomy('event_type', array(
			0 => 'events',
		), array(
			'labels' => array(
				'name' => 'Event Types',
				'singular_name' => 'Event Type',
				'menu_name' => 'Event Types',
				'all_items' => 'All Event Types',
				'edit_item' => 'Edit Event Type',
				'view_item' => 'View Event Type',
				'update_item' => 'Update Event Type',
				'add_new_item' => 'Add New Event Type',
				'new_item_name' => 'New Event Type Name',
				'parent_item' => 'Parent Event Type',
				'parent_item_colon' => 'Parent Event Type:',
				'search_items' => 'Search Event Types',
				'not_found' => 'No event types found',
				'no_terms' => 'No event types',
				'filter_by_item' => 'Filter by event type',
				'items_list_navigation' => 'Event Types list navigation',
				'items_list' => 'Event Types list',
				'back_to_items' => '← Go to event types',
				'item_link' => 'Event Type Link',
				'item_link_description' => 'A link to a event type',
			),
			'public' => true,
			'hierarchical' => true,
			'show_in_menu' => true,
			'show_in_nav_menus' => false,
			'show_in_rest' => true,
			'show_tagcloud' => false,
			'show_admin_column' => true,
			'show_in_graphql'	=> true,
			'graphql_single_name' => 'event_type',
			'graphql_plural_name' => 'event_types',
		));

		register_taxonomy('event_location', array(
			0 => 'events',
		), array(
			'labels' => array(
				'name' => 'Locations',
				'singular_name' => 'Location',
				'menu_name' => 'Event Locations',
				'all_items' => 'All Locations',
				'edit_item' => 'Edit Location',
				'view_item' => 'View Location',
				'update_item' => 'Update Location',
				'add_new_item' => 'Add New Location',
				'new_item_name' => 'New Location Name',
				'parent_item' => 'Parent Location',
				'parent_item_colon' => 'Parent Location:',
				'search_items' => 'Search Locations',
				'not_found' => 'No locations found',
				'no_terms' => 'No locations',
				'filter_by_item' => 'Filter by location',
				'items_list_navigation' => 'Locations list navigation',
				'items_list' => 'Locations list',
				'back_to_items' => '← Go to locations',
				'item_link' => 'Location Link',
				'item_link_description' => 'A link to a location',
			),
			'public' => true,
			'hierarchical' => true,
			'show_in_menu' => true,
			'show_in_nav_menus' => false,
			'show_in_rest' => true,
			'show_tagcloud' => false,
			'show_admin_column' => true,
			'show_in_graphql'	=> true,
			'graphql_single_name' => 'event_location',
			'graphql_plural_name' => 'event_locations',
		));
	}
	function enable_taxonomies_in_wp_graphql($args, $taxonomy) {
		$taxonomies = array(
			array(
				'slug'   => 'event_type',
				'single' => 'Event Type',
				'plural' => 'Event Type'
			),
			array(
				'slug'   => 'event_location',
				'single' => 'Location',
				'plural' => 'Locations'
			),
		);
		foreach ($taxonomies as $tax) {
			if ($tax['slug'] === $taxonomy) {
				$args['show_in_graphql'] = true;
				$args['graphql_single_name'] = $tax['single'];
				$args['graphql_plural_name'] = $tax['plural'];
			}
		}
		return $args;
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