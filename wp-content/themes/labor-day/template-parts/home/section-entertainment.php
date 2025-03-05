<?php
/**
 * Template part for displaying entertainment section
 *
 * @package ChoctawNation
 * @subpackage Home
 * @since 2.0.0
 */

use ChoctawNation\ACF\Event;

$fields = get_field( 'featured_entertainment' );
if ( ! $fields['show_section'] ) {
	return;
}
/**
 * An array of Post IDs
 *
 * @var array $events
 */
$events = array_map(
	function ( $event ) {
		return new Event( $event );
	},
	$fields['featured_entertainment_events']
);

$sorted_events = array(
	'Friday'   => array(),
	'Saturday' => array(),
	'Sunday'   => array(),
);

foreach ( $events as $event ) {
	$sorted_events[ $event->get_the_day() ][] = $event;
}

foreach ( $sorted_events as $day => $day_events ) {
	usort(
		$day_events,
		function ( $a, $b ) {
			return strtotime( $a->get_the_start_time() ) - strtotime( $b->get_the_start_time() );
		}
	);
	$sorted_events[ $day ] = $day_events;
}

?>
<section id="entertainment" class="container d-flex flex-column my-5 row-gap-4">
	<div class="row">
		<div class="col">
			<h2 class="text-primary-dark">Special Entertainment</h2>
		</div>
	</div>
	<?php foreach ( $sorted_events as $day => $day_events ) : ?>
		<?php
		if ( empty( $day_events ) ) {
			continue;
		}
		?>
	<div class="row">
		<div class="col">
			<h2 class="text-secondary fs-3"><?php echo esc_html( $day ); ?></h2>
		</div>
	</div>
	<div class="row row-cols-1 row-cols-lg-2 row-gap-5">
		<?php foreach ( $day_events as $event ) : ?>
		<div class="col d-flex flex-column position-relative" data-aos="fade-right">
			<figure class="ratio ratio-16x9 mb-0">
				<?php
				echo get_the_post_thumbnail(
					$event->get_the_id(),
					'full',
					array(
						'class'   => 'object-fit-cover w-100 h-100',
						'loading' => 'lazy',
					)
				);
				?>
			</figure>
			<h3>
				<a href="<?php echo get_permalink( $event->get_the_id() ); ?>" class="stretched-link text-decoration-none">
					<?php $event->the_title(); ?>
				</a>
			</h3>
			<span class="fw-bold text-gray fs-5"><?php $event->the_times(); ?></span>
		</div>
		<?php endforeach; ?>
	</div>
	<?php endforeach; ?>
	<div class="row justify-content-center">
		<div class="col-auto">
			<a href="/events" class="btn btn-primary">See Full Schedule</a>
		</div>
	</div>
</section>
