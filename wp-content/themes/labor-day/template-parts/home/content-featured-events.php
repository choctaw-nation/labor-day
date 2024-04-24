<?php
/**
 * The display for featured events on the homepage.
 *
 * @package ChoctawNation
 */

use ChoctawNation\Content\Sections;

extract( $args );
$content = new Sections();

$card_1                        = array(
	'image_src'        => get_the_post_thumbnail_url( $first ),
	'image_alt'        => get_post_meta( get_post_thumbnail_id( $first ), '_wp_attachment_image_alt', true ),
	'srcset'           => wp_get_attachment_image_srcset( get_post_thumbnail_id( $first ) ),
	'headline'         => get_the_title( $first ),
	'headline_element' => 'h4',
	'headline_class'   => 'featured-event__title',
);
$card_1['subheadline_content'] = "<span class='featured-event__start-time'>" . get_field( 'info', $first )['start_time'] . '</span>';

$card_2                        = array(
	'image_src'        => get_the_post_thumbnail_url( $second ),
	'image_alt'        => get_post_meta( get_post_thumbnail_id( $second ), '_wp_attachment_image_alt', true ),
	'srcset'           => wp_get_attachment_image_srcset( get_post_thumbnail_id( $second ) ),
	'headline'         => get_the_title( $second ),
	'headline_element' => 'h4',
	'headline_class'   => 'featured-event__title',
);
$card_2['subheadline_content'] = "<span class='featured-event__start-time'>" . get_field( 'info', $second )['start_time'] . '</span>';
?>
<div class="col-lg-6 mb-5">
	<a href="<?php echo get_the_permalink( $first ); ?>">
		<?php $content->vertical_card( $card_1 ); ?>
	</a>

</div>
<div class="col-lg-6 mb-5">
	<a href="<?php echo get_the_permalink( $second ); ?>">
		<?php $content->vertical_card( $card_2 ); ?>
	</a>
</div>
