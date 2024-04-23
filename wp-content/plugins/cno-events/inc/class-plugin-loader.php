<?php
/**
 * The Plugin Loader
 *
 * @package CNOLaborDay
 * @subpackage Events
 */

namespace CNOLaborDay\Events;

use LaborDay\Events\Custom_Rest_Route;

/**
 * The Plugin Loader
 */
class Plugin_Loader {
	private Custom_Rest_Route $rest_handler;
	/**
	 * Constructor
	 */
	public function __construct() {
		require_once __DIR__ . '/class-custom-rest-route.php';
		$this->rest_handler = new Custom_Rest_Route();
		add_action( 'init', array( $this, 'register_event_custom_post_type' ) );
		add_filter( 'template_include', array( $this, 'include_templates' ) );
		add_action( 'wp_enqueue_scripts', array( $this, 'enqueue_event_styles' ) );
		add_action( 'rest_api_init', array( $this->rest_handler, 'register_rest_routes' ) );
	}

	/**
	 * Activate the plugin
	 */
	public function activate() {
		$this->register_event_custom_post_type();
		$this->register_rest_routes();
		flush_rewrite_rules();
	}

	/**
	 * Deactivate the plugin
	 */
	public function deactivate() {
		unregister_post_type( 'events' );
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
	 * Register the custom post type
	 *
	 * @param array $args The post type arguments.
	 */
	public function register_event_custom_post_type( $args = array() ) {
		$post_type_labels = array(
			'name'               => 'Events',
			'singular_name'      => 'Event',
			'menu_name'          => 'Events',
			'parent_item_colon'  => 'Parent Event',
			'all_items'          => 'All Events',
			'view_item'          => 'View Event',
			'view_items'         => 'View Events',
			'add_new_item'       => 'Add New Event',
			'add_new'            => 'Add Event',
			'edit_item'          => 'Edit Event',
			'update_item'        => 'Update Event',
			'search_items'       => 'Search Events',
			'not_found'          => 'Not Found',
			'not_found_in_trash' => 'Not found in Trash',
		);
		if ( empty( $args ) ) {
			$args = array(
				'labels'              => $post_type_labels,
				'hierarchical'        => false,
				'description'         => 'Events',
				'supports'            => array( 'title', 'thumbnail', 'revisions', 'excerpt' ),
				'show_ui'             => true,
				'show_in_rest'        => true,
				'show_in_menu'        => true,
				'menu_position'       => 25,
				'menu_icon'           => 'dashicons-calendar-alt',
				'show_in_nav_menus'   => true,
				'publicly_queryable'  => true,
				'exclude_from_search' => false,
				'query_var'           => true,
				'can_export'          => true,
				'public'              => true,
				'has_archive'         => true,
				'show_in_graphql'     => true,
				'graphql_single_name' => 'event',
				'graphql_plural_name' => 'events',
			);
		}
		register_post_type( 'events', $args );
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
		$custom_rest_route = new Custom_Rest_Route();
		$custom_rest_route->register_rest_routes();
	}
}