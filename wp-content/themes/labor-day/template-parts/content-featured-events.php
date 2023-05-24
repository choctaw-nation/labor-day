<?php
/**
 * The display for featured events on the homepage.
 */

extract( $args );
$content                       = new Content_Sections();
$card_1                        = array(
	'image_src'        => get_the_post_thumbnail_url( $first ),
	'headline'         => get_the_title( $first ),
	'headline_element' => 'h4',
	'headline_class'   => 'featured-event__title',
);
$card_1['subheadline_content'] = "<span class='featured-event__start-time'>Start Time: " . get_field( 'info', $first )['start_time'] . '</span>';

$card_2                        = array(
	'image_src'        => get_the_post_thumbnail_url( $second ),
	'headline'         => get_the_title( $second ),
	'headline_element' => 'h4',
	'headline_class'   => 'featured-event__title',
);
$card_2['subheadline_content'] = "<span class='featured-event__start-time'>Start Time: " . get_field( 'info', $second )['start_time'] . '</span>';
?>
<div class="col-lg-6 gx-5 mb-5">
	<a href="<?php echo get_the_permalink( $first ); ?>">
		<?php $content->vertical_card( $card_1 ); ?>
	</a>

</div>
<div class="col-lg-6 gx-5 mb-5">
	<a href="<?php echo get_the_permalink( $second ); ?>">
		<?php $content->vertical_card( $card_2 ); ?>
	</a>

</div>