<?php // phpcs:ignore Squiz.Commenting.FileComment.Missing
/**
 * Functions, Hooks and/or Filters the theme needs to run.
 * NOTE: this branches from the initial theme.
 *
 * @since 1.1
 */
class CNO_THEME {
	// phpcs:ignore Squiz.Commenting.FunctionComment.Missing
	public function __construct() {
		$this->load_required_files();
		add_action( 'wp_enqueue_scripts', array( $this, 'enqueue_cno_scripts' ) );
		add_action( 'after_setup_theme', array( $this, 'register_cno_menus' ) );
		add_action( 'after_setup_theme', array( $this, 'handle_theme_supports' ) );
		$this->disable_discussion();
		add_action( 'init', array( $this, 'alter_post_types' ) );
		add_action( 'init', array( $this, 'register_taxonomies' ) );
		$this->handle_theme_image_sizes();
	}

	/** Calls in Required Files */
	private function load_required_files() {
		require WPMU_PLUGIN_DIR . '/advanced-custom-fields-pro/acf.php';
		require WPMU_PLUGIN_DIR . '/initial-acf-fields.php';
		require_once get_template_directory() . '/inc/acf-fields.php';
		require_once get_template_directory() . '/inc/operational-hours/class-operational-hours.php';
		require_once get_template_directory() . '/inc/component-classes/class-content-components.php';
		require_once get_template_directory() . '/inc/component-classes/class-content-sections.php';
		require_once get_template_directory() . '/inc/class-cno-nav-walker.php';
		require_once get_template_directory() . '/inc/theme-functions.php';
		require_once get_template_directory() . '/inc/utilities.php';
	}

	/** Handles Theme Sizes */
	private function handle_theme_image_sizes() {
		$sizes = array(
			array(
				'name'   => 'hero-banner',
				'width'  => 1920,
				'height' => 1080,
			),
			array(
				'name'   => 'max-landscape',
				'width'  => 856,
				'height' => 481,
			),
			array(
				'name'   => 'max-portrait',
				'width'  => 421,
				'height' => 748,
			),
		);
		foreach ( $sizes as $size ) {
			add_image_size( $size['name'], $size['width'], $size['height'] );
		}
		$removeable_sizes = array( '1536x1536', '2048x2048' );
		foreach ( $removeable_sizes as $size ) {
			remove_image_size( $size );
		}
	}

	/** Register custom taxonomies. */
	public function register_taxonomies() {
		if ( ! post_type_exists( 'events' ) ) {
			return;
		}
		register_taxonomy(
			'event_type',
			'events',
			array(
				'labels'              => array(
					'name'                  => 'Event Types',
					'singular_name'         => 'Event Type',
					'menu_name'             => 'Event Types',
					'all_items'             => 'All Event Types',
					'edit_item'             => 'Edit Event Type',
					'view_item'             => 'View Event Type',
					'update_item'           => 'Update Event Type',
					'add_new_item'          => 'Add New Event Type',
					'new_item_name'         => 'New Event Type Name',
					'parent_item'           => 'Parent Event Type',
					'parent_item_colon'     => 'Parent Event Type:',
					'search_items'          => 'Search Event Types',
					'not_found'             => 'No event types found',
					'no_terms'              => 'No event types',
					'filter_by_item'        => 'Filter by event type',
					'items_list_navigation' => 'Event Types list navigation',
					'items_list'            => 'Event Types list',
					'back_to_items'         => '← Go to event types',
					'item_link'             => 'Event Type Link',
					'item_link_description' => 'A link to a event type',
				),
				'public'              => true,
				'hierarchical'        => true,
				'show_in_menu'        => true,
				'show_in_nav_menus'   => false,
				'show_in_rest'        => true,
				'show_tagcloud'       => false,
				'show_admin_column'   => true,
				'show_in_graphql'     => true,
				'graphql_single_name' => 'event_type',
				'graphql_plural_name' => 'event_types',
			)
		);

		register_taxonomy(
			'event_location',
			'events',
			array(
				'labels'              => array(
					'name'                  => 'Locations',
					'singular_name'         => 'Location',
					'menu_name'             => 'Event Locations',
					'all_items'             => 'All Locations',
					'edit_item'             => 'Edit Location',
					'view_item'             => 'View Location',
					'update_item'           => 'Update Location',
					'add_new_item'          => 'Add New Location',
					'new_item_name'         => 'New Location Name',
					'parent_item'           => 'Parent Location',
					'parent_item_colon'     => 'Parent Location:',
					'search_items'          => 'Search Locations',
					'not_found'             => 'No locations found',
					'no_terms'              => 'No locations',
					'filter_by_item'        => 'Filter by location',
					'items_list_navigation' => 'Locations list navigation',
					'items_list'            => 'Locations list',
					'back_to_items'         => '← Go to locations',
					'item_link'             => 'Location Link',
					'item_link_description' => 'A link to a location',
				),
				'public'              => true,
				'hierarchical'        => true,
				'show_in_menu'        => true,
				'show_in_nav_menus'   => false,
				'show_in_rest'        => true,
				'show_tagcloud'       => false,
				'show_admin_column'   => true,
				'show_in_graphql'     => true,
				'graphql_single_name' => 'event_location',
				'graphql_plural_name' => 'event_locations',
			)
		);
	}

	/**
	 * Adds scripts with the appropriate dependencies
	 */
	public function enqueue_cno_scripts() {
		$deps                = array();
		$deps['main']        = require_once get_theme_file_path( '/dist/global.asset.php' );
		$deps['vendors']     = require_once get_theme_file_path( '/dist/vendors/vendors.asset.php' );
		$deps['bootstrap']   = require_once get_theme_file_path( '/dist/vendors/bootstrap.asset.php' );
		$deps['fontawesome'] = require_once get_theme_file_path( '/dist/vendors/fontawesome.asset.php' );

		// CSS
		wp_enqueue_style(
			'vendors',
			get_template_directory_uri() . '/dist/vendors/vendors.css',
			array(),
			$deps['vendors']['version']
		);
		wp_enqueue_style(
			'main',
			get_template_directory_uri() . '/dist/global.css',
			array( 'vendors' ),
			$deps['main']['version']
		);

		// JS
		wp_enqueue_script(
			'bootstrap',
			get_template_directory_uri() . '/dist/vendors/bootstrap.js',
			array(),
			$deps['bootstrap']['version'],
			array( 'in_footer' => true )
		);

		wp_enqueue_script(
			'fontawesome',
			get_template_directory_uri() . '/dist/vendors/fontawesome.js',
			array(),
			$deps['fontawesome']['version'],
			array( 'in_footer' => true )
		);

		$global_deps = array_merge( $deps['main']['dependencies'], array( 'bootstrap', 'fontawesome' ) );
		wp_enqueue_script(
			'main',
			get_template_directory_uri() . '/dist/global.js',
			$global_deps,
			$deps['main']['version'],
			array( 'in_footer' => true )
		);

		wp_localize_script( 'main', 'cnoSiteData', array( 'rootUrl' => home_url() ) );

		$this->remove_wordpress_styles( array( 'classic-theme-styles', 'wp-block-library', 'dashicons', 'global-styles' ) );

	}

	/**
	 * Provide an array of handles to dequeue
	 *
	 * @param array $handles the script/style handles
	 */
	private function remove_wordpress_styles( array $handles ) {
		foreach ( $handles as $handle ) {
			wp_dequeue_style( $handle );
		}
	}

	/** Register theme menus. */
	public function register_cno_menus() {
		register_nav_menus(
			array(
				'primary_menu'  => __( 'Primary Menu', 'cno' ),
				'mobile_menu'   => __( 'Mobile Menu', 'cno' ),
				'footer_menu-1' => __( 'Footer Menu 1', 'cno' ),
				'footer_menu-2' => __( 'Footer Menu 2', 'cno' ),
			)
		);
	}

	/** Add Theme Support for Featured Images & WP handling of `<title>` tag */
	public function handle_theme_supports() {
		add_theme_support( 'post-thumbnails' );
		add_theme_support( 'title-tag' );
	}

	/**
	 * Remove post type supports.
	 */
	public function alter_post_types() {
		$post_types = array( 'post', 'page' );
		foreach ( $post_types as $post_type ) {
			$this->disable_post_type_support( $post_type );
		}
	}

	/** Remove comments, pings and trackbacks. */
	public function disable_discussion() {
		// Close comments on the front-end
		add_filter( 'comments_open', '__return_false', 20, 2 );
		add_filter( 'pings_open', '__return_false', 20, 2 );

		// Hide existing comments.
		add_filter( 'comments_array', '__return_empty_array', 10, 2 );

		// Remove comments page in menu.
		add_action(
			'admin_menu',
			function () {
				remove_menu_page( 'edit-comments.php' );
			}
		);

		// Remove comments links from admin bar.
		add_action(
			'init',
			function () {
				if ( is_admin_bar_showing() ) {
					remove_action( 'admin_bar_menu', 'wp_admin_bar_comments_menu', 60 );
				}
			}
		);
	}

	/**
	 * Disable post type supports for a post type
	 *
	 * @param string $post_type the post type to remove supports from
	 */
	private function disable_post_type_support( string $post_type ) {
		$supports = array( 'editor', 'comments', 'trackbacks', 'revisions', 'author' );
		foreach ( $supports as $support ) {
			if ( post_type_supports( $post_type, $support ) ) {
				remove_post_type_support( $post_type, $support );
			}
		}
	}
}