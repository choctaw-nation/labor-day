<?php
/**
 * The Plugin Loader
 *
 * @package CNOLaborDay
 * @subpackage Events
 */

namespace CNOLaborDay\Events;

use CNOLaborDay\Events\Custom_Rest_Route;
use CNOLaborDay\Events\CPT_Loader;

/**
 * The Plugin Loader
 */
class Plugin_Loader {
	/**
	 * The Custom Rest Route Class
	 *
	 * @var Custom_Rest_Route
	 */
	private Custom_Rest_Route $rest_handler;

	/**
	 * CPT Loader class
	 *
	 * @var CPT_Loader
	 */
	private CPT_Loader $cpt_loader;

	/**
	 * Constructor
	 */
	public function __construct() {
		require_once __DIR__ . '/class-custom-rest-route.php';
		$this->rest_handler = new Custom_Rest_Route();
		require_once __DIR__ . '/class-cpt-loader.php';
		$this->cpt_loader = new CPT_Loader();
		add_action( 'init', array( $this->cpt_loader, 'init' ) );
		add_filter( 'template_include', array( $this, 'include_templates' ) );
		add_action( 'wp_enqueue_scripts', array( $this, 'enqueue_event_styles' ) );
		add_action( 'rest_api_init', array( $this->rest_handler, 'register_rest_routes' ) );
	}

	/**
	 * Activate the plugin
	 */
	public function activate() {
		$this->cpt_loader->init();
		$this->register_rest_routes();
		flush_rewrite_rules();
	}

	/**
	 * Deactivate the plugin
	 */
	public function deactivate() {
		$this->cpt_loader->deactivate();
		$this->rest_handler->deregister_rest_route();
		remove_filter( 'template_include', array( $this, 'include_templates' ) );
		remove_action( 'wp_enqueue_scripts', array( $this, 'enqueue_event_styles' ) );
		remove_action( 'rest_api_init', array( $this->rest_handler, 'register_rest_routes' ) );
		flush_rewrite_rules();
	}

	/**
	 * Include custom template overrides
	 *
	 * @param string $template The template file.
	 * @return string
	 */
	public function include_templates( string $template ): string {
		if ( 'events' === get_post_type() && is_single() && ! is_tax() ) {
			$template = locate_template( array( 'templates/single-events.php' ), false, false );
			if ( ! $template ) {
				$template = dirname( __DIR__, 1 ) . '/templates/single-events.php';
			}
		}
		if ( 'events' === get_post_type() && is_archive() && ! is_tax() ) {
			$template = locate_template( array( 'templates/archive-events.php' ), false, false );
			if ( ! $template ) {
				$template = dirname( __DIR__, 1 ) . '/templates/archive-events.php';
			}
		}
		return $template;
	}



	/**
	 * Enqueue the event styles
	 */
	public function enqueue_event_styles() {
		wp_enqueue_style( 'cno-events-global', plugin_dir_url( 'cno-events/build/style-global.css' ) . 'style-global.css', array(), '1.0' );
	}

	/**
	 * Register the custom rest routes
	 */
	public function register_rest_routes() {
		$this->rest_handler->register_rest_routes();
	}
}