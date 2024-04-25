<?php
/**
 * CPT Loader
 * Loads the Custom Post Type + Taxonomies
 *
 * @package CNOLaborDay
 * @subpackage Events
 */

namespace CNOLaborDay\Events;

/**
 * The CPT Loader
 */
class CPT_Loader {
	/**
	 * Init the post types and taxonomies
	 */
	public function init() {
		$this->register_event_custom_post_type();
		$this->register_taxonomies();
		add_action( 'init', array( $this, 'register_event_custom_post_type' ) );
		add_action( 'init', array( $this, 'register_event_taxonomies' ) );
	}

	/**
	 * Deactivate the plugin
	 */
	public function deactivate() {
		unregister_post_type( 'events' );
		unregister_taxonomy( 'event_location' );
		unregister_taxonomy( 'event_type' );
		flush_rewrite_rules();
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
			);
		}
		register_post_type( 'events', $args );
	}

	/** Register custom taxonomies. */
	public function register_taxonomies() {
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
				'labels'            => array(
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
				'public'            => true,
				'hierarchical'      => true,
				'show_in_menu'      => true,
				'show_in_nav_menus' => false,
				'show_in_rest'      => true,
				'show_tagcloud'     => false,
				'show_admin_column' => true,
			)
		);
	}
}