<?php
/**
 * Class: Custom Rest Route
 *
 * @package LaborDay
 * @subpackage Events
 */

namespace LaborDay\Events;

/**
 * Custom Rest Route
 */
class Custom_Rest_Route {

	/**
	 * Register the custom rest routes
	 */
	public function register_rest_routes() {
		register_rest_route(
			'cno/v1',
			'/events',
			array(
				'methods'             => \WP_REST_Server::READABLE,
				'callback'            => array( $this, 'get_events' ),
				'args'                => array(
					'search' => array(
						'description' => 'Search term',
						'type'        => 'string',
					),
				),
				'permission_callback' => '__return_true',
			)
		);
	}

	/**
	 * Get the events
	 *
	 * @param \WP_REST_Request $request The request object.
	 * @return \WP_REST_Response
	 */
	public function get_events( \WP_REST_Request $request ): \WP_REST_Response {
		$args        = array(
			'post_type'      => 'events',
			'posts_per_page' => -1,
		);
		$search_term = $request->get_param( 'search' );
		if ( ! empty( $search_term ) ) {
			$args['s'] = $search_term;
		}
		$event_info = array();
		$events     = new \WP_Query( $args );
		if ( $events->have_posts() ) {
			while ( $events->have_posts() ) {
				$events->the_post();
				$event_info[] = array(
					'eventId'        => get_the_ID(),
					'title'          => get_the_title(),
					'info'           => get_field( 'info' ),
					'description'    => esc_textarea( get_field( 'archive_content' ) ),
					'link'           => get_the_permalink(),
					'featured_image' => ! has_post_thumbnail() ? null : array(
						'src'     => get_the_post_thumbnail_url( get_the_ID(), 'full' ),
						'altText' => get_post_meta( get_post_thumbnail_id(), '_wp_attachment_image_alt', true ),
						'srcset'  => wp_get_attachment_image_srcset( get_post_thumbnail_id(), 'full' ),
					),
					'locations'      => get_the_terms( get_the_ID(), 'event_location' ),
					'type'           => get_the_terms( get_the_ID(), 'event_type' ),
				);
			}
		}

		return rest_ensure_response( $event_info );
	}
}