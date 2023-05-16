<?php
/**
 * The display for featured events on the homepage.
 */

extract( $args );
$content = new Content_Sections();
$card_1  = array(
	'image_src'        => get_the_post_thumbnail_url( $first ),
	'headline'         => get_the_title( $first ),
	'headline_element' => 'h4',
	'headline_class'   => 'featured-event__title',
);

$card_1['subheadline_content'] = cno_trim_event_description( get_field( 'description', $first ), false );
$card_2                        = array(
	'image_src'        => get_the_post_thumbnail_url( $second ),
	'headline'         => get_the_title( $second ),
	'headline_element' => 'h4',
	'headline_class'   => 'featured-event__title',
);
$card_2['subheadline_content'] = cno_trim_event_description( get_field( 'description', $second ), false );
?>
<div class="col-lg-6">
	<?php $content->vertical_card( $card_1 ); ?>
	<div class="cno-event__buttons mt-4">
		<button class="btn__fill--primary" data-add-to-schedule='true' data-id="<?php echo $first; ?>">Add to Schedule</button>
		<a href="<?php the_permalink( $first ); ?>" class="btn__outline--primary">Learn More</a>
		<div class="cno-event-schedule-confirmation"></div>
	</div>
</div>
<div class="col-lg-6">
	<?php $content->vertical_card( $card_2 ); ?>
	<div class="cno-event__buttons mt-4">
		<button class="btn__fill--primary" data-add-to-schedule='true' data-id="<?php echo $second; ?>">
			Add to Schedule
		</button>
		<a href="<?php the_permalink( $second ); ?>" class="btn__outline--primary">Learn More</a>
		<div class="cno-event-schedule-confirmation"></div>
	</div>
</div>