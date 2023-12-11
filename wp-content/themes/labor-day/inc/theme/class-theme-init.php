<?php
/**
 * Initializes the Theme
 *
 * @package ChoctawNation
 * @since 1.3
 */

namespace ChoctawNation;

/** Builds the Theme */
class Theme_Init {
	// phpcs:ignore 
	public function __construct() {
		$this->load_required_files();
		$this->disable_discussion();
		$this->cno_set_environment();
		$this->handle_theme_image_sizes();

		add_action( 'wp_enqueue_scripts', array( $this, 'enqueue_cno_scripts' ) );
		add_action( 'after_setup_theme', array( $this, 'handle_theme_supports' ) );
		add_action( 'init', array( $this, 'alter_post_types' ) );
	}

	/** Calls in Required Files */
	private function load_required_files() {
		$base_path = get_template_directory() . '/inc';
		$this->load_acf_classes(
			array(
				'generator',
				'image',
				'hero',
			)
		);

		$files = array( 'theme-functions' );
		foreach ( $files as $file ) {
			require_once $base_path . "/theme/{$file}.php";
		}

		$components = array( 'components', 'sections', 'map' );
		foreach ( $components as $component ) {
			require_once $base_path . "/component-classes/class-{$component}.php";
		}

		$asset_loader = array( 'enum-enqueue-type', 'class-asset-loader' );
		foreach ( $asset_loader as $asset ) {
			require_once $base_path . "/theme/asset-loader/{$asset}.php";
		}

		require_once $base_path . '/theme/class-operational-hours.php';
		require_once $base_path . '/theme/navwalkers/class-nav-walker.php';
	}

	/** Takes an array of file names to load
	 *
	 * @param string[] $classes the classes to load
	 */
	private function load_acf_classes( array $classes ) {
		$path = get_template_directory() . '/inc/acf';
		foreach ( $classes as $class_file ) {
			require_once $path . '/acf-classes/class-' . $class_file . '.php';
		}
	}

	/** Handles Theme Sizes */
	private function handle_theme_image_sizes() {
		$sizes = array(
			array(
				'name'   => 'hero-banner',
				'width'  => 3840,
				'height' => 2160,
			),
			array(
				'name'   => 'max-landscape',
				'width'  => 1712,
				'height' => 962,
			),
			array(
				'name'   => 'max-portrait',
				'width'  => 842,
				'height' => 1496,
			),
		);

		foreach ( $sizes as $size ) {
			add_image_size( $size['name'], $size['width'], $size['height'] );
		}

		$removable_sizes = array( '1536x1536', '2048x2048' );
		foreach ( $removable_sizes as $size ) {
			remove_image_size( $size );
		}
	}

	/** Sets an Environment Variable */
	private function cno_set_environment() {
		$server_name = $_SERVER['SERVER_NAME'];

		if ( false !== strpos( $server_name, '.local' ) ) {
			$_ENV['CNO_ENV'] = 'dev';
		} elseif ( false !== strpos( $server_name, 'wpengine' ) ) {
			$_ENV['CNO_ENV'] = 'stage';
		} else {
			$_ENV['CNO_ENV'] = 'prod';
		}
	}

	/**
	 * Adds scripts with the appropriate dependencies
	 */
	public function enqueue_cno_scripts() {
		wp_enqueue_style(
			'typekit',
			'https://use.typekit.net/jky5sek.css',
			array(),
			null // phpcs:ignore
		);

		$fontawesome = require_once get_theme_file_path( '/dist/vendors/fontawesome.asset.php' );
		wp_enqueue_script(
			'fontawesome',
			get_template_directory_uri() . '/dist/vendors/fontawesome.js',
			array(),
			$fontawesome['version'],
			array( 'strategy' => 'defer' )
		);

		$animate   = new Asset_Loader( 'animate', Enqueue_Type::style, 'vendors' );
		$bootstrap = new Asset_Loader( 'bootstrap', Enqueue_Type::both, 'vendors' );

		$global_scripts = new Asset_Loader( 'global', Enqueue_Type::both, null, array( 'bootstrap' ) );
		wp_localize_script( 'global', 'cnoSiteData', array( 'rootUrl' => home_url() ) );

		wp_enqueue_style(
			'main',
			get_stylesheet_uri(),
			array( 'global' ),
			null, // phpcs:ignore
		);

		$this->remove_wordpress_styles( array( 'classic-theme-styles', 'wp-block-library', 'dashicons', 'global-styles' ) );
		if ( 'prod' === $_ENV['CNO_ENV'] ) {
			$this->add_google_tag_manager();
		}
	}

	/**
	 * Adds Google Tag Manager to the head of the site
	 */
	private function add_google_tag_manager() {
		wp_enqueue_script( 'google-tag-manager', 'https://www.googletagmanager.com/gtag/js?id=G-FSCY06MCKK', array(), null, array( 'strategy' => 'async' ) );
		add_action(
			'wp_head',
			function () {
				echo "<script>window.dataLayer = window.dataLayer || [];function gtag() {dataLayer.push(arguments);}gtag('js', new Date());gtag('config', 'G-FSCY06MCKK');</script>";
			}
		);
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

	/** Add Theme Support for Featured Images & WP handling of `<title>` tag */
	public function handle_theme_supports() {
		add_theme_support( 'post-thumbnails' );
		add_theme_support( 'title-tag' );
		register_nav_menus(
			array(
				'primary_menu'  => __( 'Primary Menu', 'cno' ),
				'mobile_menu'   => __( 'Mobile Menu', 'cno' ),
				'footer_menu-1' => __( 'Footer Menu 1', 'cno' ),
				'footer_menu-2' => __( 'Footer Menu 2', 'cno' ),
			)
		);
	}

	/**
	 * Remove post type supports.
	 */
	public function alter_post_types() {
		$post_types = array( 'post', 'page' );
		foreach ( $post_types as $post_type ) {
			$this->disable_post_type_support( $post_type );
		}
		$this->register_taxonomies();
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
					'back_to_items'         => '������� Go to locations',
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

	/** Remove comments, pings and trackbacks. */
	private function disable_discussion() {
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
