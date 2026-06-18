<?php
/**
 * Events Feature Handler
 *
 * @package ChoctawNation
 */

namespace ChoctawNation\Features\Events;

/**
 * Handles the Events feature, including overriding the search template and query for events.
 */
class Events_Handler {
	/**
	 * Loads the rest routes for the events feature
	 */
	public function load_rest_routes() {
		$events_rest_router = new Events_Rest_Route();
		add_action( 'rest_api_init', array( $events_rest_router, 'register_routes' ) );
	}

	/**
	 * Overrides the search template to use archive-events.php
	 *
	 * @param string $template the template to override
	 * @return string the new template
	 */
	public function override_search_template( $template ): string {
		if ( is_search() ) {
			$new_template = locate_template( array( 'archive-events.php' ) );
			if ( '' !== $new_template ) {
				return $new_template;
			}
		}
		return $template;
	}

	/**
	 * Override the events query to use archive-events.php
	 *
	 * @param \WP_Query $query the query to override
	 */
	public function override_events_query( \WP_Query $query ) {
		if ( is_admin() || 'events' !== $query->get( 'post_type' ) || ! $query->is_main_query() ) {
			return;
		}
		$query->set(
			'meta_query',
			array(
				'relation'          => 'AND',
				'day_clause'        => array(
					'key'     => 'info_day',
					'compare' => 'EXISTS',
				),
				'start_time_clause' => array(
					'key'     => 'info_start_time',
					'compare' => 'EXISTS',
				),
				'end_time_clause'   => array(
					'key' => 'info_end_time',
				),
			)
		);
		$query->set(
			'orderby',
			array(
				'day_clause'        => 'ASC',
				'start_time_clause' => 'ASC',
				'end_time_clause'   => 'ASC',
			)
		);
	}
}
