<?php
/**
 * The display for Events inside of a loop.
 *
 * @package LaborDay
 * @subpackage Events
 */

?>
<article class="cno-event">
	<figure class="cno-event__image">
		<?php the_post_thumbnail( 'large' ); ?>
	</figure>
	<h2><?php the_title(); ?></h2>
	<aside class="event-meta mb-3">
		<?php extract( get_field( 'info' ) ); ?>
		<div class="event-meta__day">
			<strong>When: </strong><?php echo $day . ', ' . cno_get_the_date( $day ); ?>
		</div>
		<?php
		$terms_list = get_the_term_list( $post->ID, 'event_location', '<div class="event-meta__location"><strong>Where:</strong> ', '', '</div>' );
		if ( ! is_wp_error( $terms_list ) ) {
			echo $terms_list;
		}
		?>
		<div class="event-meta__start-time">
			<strong>Start Time:</strong> <?php echo $start_time; ?>
		</div>
		<?php
		if ( ! empty( $end_time ) ) {
			echo '<div class="event-meta__end-time">';
			echo '<strong>End Time:</strong> ' . $end_time;
			echo '</div>';
		}
		?>
		<?php
		$terms_list = get_the_term_list( $post->ID, 'event_type', '<div class="event-meta__type"><strong>Event Type:</strong> ', '', '</div>' );
		if ( ! is_wp_error( $terms_list ) ) {
			echo $terms_list;
		}
		?>
	</aside>
	<div class="about">
		<?php
		if ( has_excerpt() ) {
			the_excerpt();
		}
		?>
	</div>
	<div class="cno-event__buttons">
		<button class="btn__fill--primary" data-add-to-schedule='true' data-id="<?php echo get_the_ID(); ?>">Add to Schedule</button>
		<a href="<?php the_permalink(); ?>" class="btn__outline--primary">Learn More</a>
		<div class="cno-event-schedule-confirmation"></div>
	</div>
</article>
