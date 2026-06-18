<?php
/**
 * Initializes the Theme
 *
 * @package ChoctawNation
 * @since 1.3
 */

namespace ChoctawNation;

use ChoctawNation\Utils\Asset_Loader;
use ChoctawNation\Utils\Enqueue_Type;

/** Builds the Theme */
class Theme_Init {
	/**
	 * Bootstrap the theme
	 */
	public function setup_theme() {
		$this->load_required_files();
		$this->disable_discussion();
		$this->edit_roles();
		$this->allow_svg();
		$this->handle_plugins();
		$this->handle_theme_supports();
		$this->handle_theme_image_sizes();
		$this->load_features();
		add_action( 'wp_enqueue_scripts', array( $this, 'enqueue_cno_scripts' ) );
		add_action( 'init', array( $this, 'alter_post_types' ) );
	}

	/** Calls in Required Files */
	private function load_required_files() {
		$base_path = get_template_directory() . '/inc';
		require_once $base_path . '/theme/theme-functions.php';
	}

	/**
	 * Edit user roles and capabilities
	 */
	private function edit_roles() {
		$role_editor = new Admin\Role_Editor();
		add_action( 'admin_init', array( $role_editor, 'create_custom_roles' ) );
	}

	/**
	 * Allow SVG uploads
	 */
	private function allow_svg() {
		$svg = new Admin\Allow_SVG();
		add_filter( 'upload_mimes', array( $svg, 'cc_mime_types' ) );
		add_action( 'admin_head', array( $svg, 'fix_svg' ) );
	}

	/**
	 * Handle Plugins
	 */
	private function handle_plugins() {
		$handler = new Plugins\Plugins_Handler();
		$handler->handle_acf();
		$handler->handle_yoast();
		$handler->handle_gravity_forms();
		add_action( 'init', array( $handler, 'disable_plugins_per_environment' ) );
		add_filter( 'auto_update_plugin', array( $handler, 'handle_auto_update_plugin' ) );
	}

	/**
	 * Bootstrap Theme Features
	 */
	private function load_features() {
		$events_handler = new Features\Events\Events_Handler();
		$events_handler->load_rest_routes();
		add_action( 'pre_get_posts', array( $events_handler, 'override_events_query' ), 9999 );
		add_filter( 'template_include', array( $events_handler, 'override_search_template' ) );
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

		new Asset_Loader( 'animate', Enqueue_Type::style, 'vendors' );
		new Asset_Loader( 'bootstrap', Enqueue_Type::both, 'vendors' );

		new Asset_Loader( 'global', Enqueue_Type::both, null, array( 'bootstrap' ) );
		wp_localize_script(
			'global',
			'cnoSiteData',
			array(
				'rootUrl'       => home_url(),
				'laborDayDates' => array(
					'friday'   => get_field( 'labor_day_dates_friday', 'option' ),
					'saturday' => get_field( 'labor_day_dates_saturday', 'option' ),
					'sunday'   => get_field( 'labor_day_dates_sunday', 'option' ),
				),
			)
		);

		wp_enqueue_style(
			'main',
			get_stylesheet_uri(),
			array( 'global' ),
		null, // phpcs:ignore
		);

		$this->remove_wordpress_styles( array( 'classic-theme-styles', 'wp-block-library', 'dashicons', 'global-styles' ) );

		$add_to_schedule = require_once get_template_directory() . '/dist/modules/add-to-schedule.asset.php';
		wp_register_script(
			'add-to-schedule',
			get_template_directory_uri() . '/dist/modules/add-to-schedule.js',
			$add_to_schedule['dependencies'],
			$add_to_schedule['version'],
			true
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
