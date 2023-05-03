<?php
/**
 * The display for Events inside of a loop.
 *
 * @package ChoctawNation
 */

?>
<article class="cno-event">
	<figure class="cno-event__image">
		<?php the_post_thumbnail('large'); ?>
	</figure>
	<h2><?php the_title(); ?></h2>
	<aside class="event-meta">
		<?php extract(get_field('info')); ?>
		<div class="event-meta__day">
			<strong>When: </strong><?php echo $day . ", " . cno_get_the_date($day); ?>
		</div>
		<?php echo get_the_term_list($post->ID, taxonomy: 'event_location', before: '<div class="event-meta__location"><strong>Where:</strong> ', after: '</div>');
		?>
		<div class="event-meta__start-time">
			<strong>Start Time:</strong> <?php echo $start_time; ?>
		</div>
		<?php if (!empty($end_time)) {
			echo '<div class="event-meta__end-time">';
			echo "<strong>End Time:</strong> " . $end_time;
			echo '</div>';
		}  ?>
		<?php echo get_the_term_list($post->ID, taxonomy: 'event_type', before: '<div class="event-meta__type"><strong>Event Type:</strong> ', after: '</div>'); ?>
	</aside>
	<div class="about">
		<?php $event_description = get_field('description'); ?>
		<?php echo $event_description; ?>
	</div>
	<div class="cno-event__buttons">
		<button class="btn__fill--primary" data-add-to-schedule='true' data-id="<?php echo get_the_ID(); ?>" data-post-type="<?php echo $post->post_type; ?>">Add to Schedule</button>
		<a href="<?php the_permalink() ?>" class="btn__outline--primary">Learn More</a>
		<div class="cno-event-schedule-confirmation"></div>
	</div>
</article>
