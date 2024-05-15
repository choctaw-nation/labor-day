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
?>
<section id="entertainment" class="py-5 my-5">
	<div class="container d-flex flex-column">
		<div class="row">
			<h2 class="featured-event__headline">Special Entertainment</h2>
		</div>
		<?php foreach ( $sorted_events as $day => $day_events ) : ?>
		<?php
			if ( empty( $day_events ) ) {
				continue;
			}
			?>
		<div class="row mt-5">
			<div class="col">
				<h2 class="text-secondary fs-3"><?php echo esc_html( $day ); ?></h2>
			</div>
		</div>
		<div class="row mt-3 row-cols-1 row-cols-lg-2 row-gap-5">
			<?php foreach ( $day_events as $event ) : ?>
			<div class="col d-flex flex-column" data-aos="fade-right">
				<figure class='ratio ratio-16x9'>
					<?php
					echo get_the_post_thumbnail(
						$event->get_the_id(),
						'full',
						array(
							'class'   => 'object-fit-cover',
							'loading' => 'lazy',
						)
					);
					?>
				</figure>
				<h3><?php $event->the_title(); ?></h3>
				<span class="fw-bold fs-6"><?php $event->the_times(); ?></span>
			</div>
			<?php endforeach; ?>
		</div>
		<?php endforeach; ?>
		<div class="row">
			<div class="col d-flex flex-column align-items-center">
				<a href="/events" class="btn btn-primary">See Full Schedule</a>
			</div>
		</div>
	</div>
</section>