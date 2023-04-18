<?php

/** 
 * Single Event Template (Overrides Plugin Template)
 * 
 */

add_action('wp_enqueue_scripts', function () {
	wp_enqueue_style('cno-events', plugin_dir_url('/cno-events/build/style-index.css') . 'style-index.css', array());
});
get_header();
?>
<article class="cno-event py-5">
	<div class="event-image my-5"><?php the_post_thumbnail(); ?></div>
	<h1 class="event__title headline"><?php the_title(); ?></h1>
	<aside class="event-meta">
		<?php extract(get_field('info')); ?>
		<div class="event-meta__day">
			<strong>When: </strong><?php echo $day . ", " . cno_get_the_date($day); ?>
		</div>
		<div class="event-meta__start-time">
			<strong>Start Time:</strong> <?php echo $start_time; ?>
		</div>
		<?php if (isset($end_time)) {
			echo '<div class="event-meta__start-time">';
			echo "<strong>End Time:</strong> " . $end_time;
			echo '</div>';
		}  ?>
		<a href="#" class="btn__fill--secondary" data-add-to-schedule='true'>Add to Schedule</a>
	</aside>

	<section class="about">
		<?php $event_description = get_field('description'); ?>
		<?php echo $event_description; ?>
	</section>
</article>

<?php get_footer();