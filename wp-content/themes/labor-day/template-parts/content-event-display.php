<?php

/**
 * The display for Events inside of a loop.
 */
?>
<article class="cno-event">
	<figure class="cno-event__image">
		<?php the_post_thumbnail('large') ?>
	</figure>
	<h2><?php the_title(); ?></h2>
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
	</aside>
	<div class="about">
		<?php $event_description = get_field('description'); ?>
		<?php echo $event_description; ?>
	</div>
	<div class="cno-event__buttons">
		<a href="#" class="btn__fill--primary" data-add-to-schedule='true'>Add to Schedule</a>
		<a href="<?php the_permalink() ?>" class="btn__outline--primary">Learn More</a>
		<div class="cno-event-schedule-confirmation"></div>
	</div>
</article>