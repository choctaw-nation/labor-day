<?php
/**
 * Class: Custom Rest Route
 *
 * @package CNOLaborDay
 * @subpackage Events
 */

namespace CNOLaborDay\Events;

/**
 * Custom Rest Route
 */
class Custom_Rest_Route {
	/**
	 * The cache expiry time
	 *
	 * @var int $cache_expiry
	 */
	private $cache_expiry = 60 * 60; // 1 hour

	/**
	 * The base of the rest route
	 *
	 * @var string $base
	 */
	private $base = 'cno';

	/**
	 * The version of the rest route
	 *
	 * @var string $version
	 */
	private $version = '1';


	/**
	 * Register the custom rest routes
	 */
	public function register_rest_routes() {
		register_rest_route(
			"{$this->base}/v{$this->version}",
			'/events',
			array(
				'methods'             => \WP_REST_Server::READABLE,
				'callback'            => array( $this, 'get_events' ),
				'permission_callback' => '__return_true',
			)
		);
		register_rest_route(
			"{$this->base}/v{$this->version}",
			'/event/(?P<id>\d+)',
			array(
				'methods'             => \WP_REST_Server::READABLE,
				'callback'            => array( $this, 'get_event' ),
				'args'                => array(
					'id' => array(
						'validate_callback' => function ( $param, ) {
							return is_numeric( $param );
						},
					),
				),
				'permission_callback' => '__return_true',
			)
		);

		register_rest_route(
			"{$this->base}/v{$this->version}",
			'/events',
			array(
				'methods'             => \WP_REST_Server::READABLE,
				'callback'            => array( $this, 'find_event' ),
				'args'                => array(
					's' => array(
						'validate_callback' => function ( $param, ) {
							return sanitize_text_field( $param );
						},
					),
				),
				'permission_callback' => '__return_true',
			)
		);
	}

	/**
	 * Get the events
	 *
	 * @return \WP_REST_Response
	 */
	public function get_events(): \WP_REST_Response {
		$event_info_transient = get_transient( 'event_info_transient' );
		if ( false !== $event_info_transient ) {
			return rest_ensure_response( $event_info_transient );
		}
		$args = array(
			'post_type'      => 'events',
			'posts_per_page' => -1,
		);

		$event_info = array();
		$events     = new \WP_Query( $args );
		if ( $events->have_posts() ) {
			while ( $events->have_posts() ) {
				$events->the_post();
				$event_info[] = $this->get_the_event_array( get_the_ID() );
			}
		}

		set_transient( 'event_info_transient', $event_info, $this->cache_expiry );

		return rest_ensure_response( $event_info );
	}

	/**
	 * Get the event
	 *
	 * @param \WP_REST_Request $request The request object.
	 * @return \WP_REST_Response
	 */
	public function get_event( \WP_REST_Request $request ): \WP_REST_Response {
		$event_id = $request->get_param( 'id' );
		$event    = get_post( $event_id );
		if ( ! $event ) {
			return new \WP_Error( 'event_not_found', 'Event not found. Are you sure it exists?', array( 'status' => 404 ) );
		}

		$event_info = $this->get_the_event_array( $event_id );

		return rest_ensure_response( $event_info );
	}

	/**
	 * Builds the event array
	 *
	 * @param int $event_id The event ID.
	 * @return array the event array
	 */
	private function get_the_event_array( int $event_id ): array {
		return array(
			'eventId'        => $event_id,
			'title'          => get_the_title( $event_id ),
			'info'           => get_field( 'info', $event_id ),
			'description'    => esc_textarea( get_field( 'archive_content', $event_id ) ),
			'link'           => get_the_permalink( $event_id ),
			'featured_image' => ! has_post_thumbnail( $event_id ) ? null : array(
				'src'     => get_the_post_thumbnail_url( $event_id, 'full' ),
				'altText' => get_post_meta( get_post_thumbnail_id( $event_id ), '_wp_attachment_image_alt', true ),
				'srcset'  => wp_get_attachment_image_srcset( get_post_thumbnail_id( $event_id ), 'full' ),
			),
			'locations'      => get_the_terms( $event_id, 'event_location' ),
			'type'           => get_the_terms( $event_id, 'event_type' ),
		);
	}

	/**
	 * Handles Server-Side searching with Relevanssi
	 *
	 * @param \WP_REST_Request $request The request object.
	 */
	public function find_event( \WP_REST_Request $request ): \WP_REST_Response {
		$search = $request->get_param( 's' );
		$args   = array(
			'post_type'      => 'events',
			'posts_per_page' => -1,
			's'              => $search,
			'relevanssi'     => true,
		);

		$event_info = array();
		$events     = new \WP_Query( $args );
		if ( $events->have_posts() ) {
			while ( $events->have_posts() ) {
				$events->the_post();
				$event_info[] = $this->get_the_event_array( get_the_ID() );
			}
		} else {
			throw new \WP_Error( 'no_events_found', 'No events found.', array( 'status' => 404 ) );
		}

		return rest_ensure_response( $event_info );
	}
}
