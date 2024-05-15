<?php
/**
 * Initializes the Theme
 *
 * @package ChoctawNation
 * @since 1.3
 */

namespace ChoctawNation;

use CNOLaborDay\Events\Custom_Rest_Route;

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
				'event',
			)
		);

		$files = array( 'theme-functions', 'class-custom-rest-route', 'class-operational-hours', 'navwalkers/class-navwalker' );
		foreach ( $files as $file ) {
			require_once $base_path . "/theme/{$file}.php";
		}
		$rest_handler = new Custom_Rest_Route();
		add_action( 'rest_api_init', array( $rest_handler, 'register_rest_routes' ) );

		$components = array( 'components', 'sections', 'map' );
		foreach ( $components as $component ) {
			require_once $base_path . "/component-classes/class-{$component}.php";
		}

		$asset_loader = array( 'enum-enqueue-type', 'class-asset-loader' );
		foreach ( $asset_loader as $asset ) {
			require_once $base_path . "/theme/asset-loader/{$asset}.php";
		}
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