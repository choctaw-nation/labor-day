<?php
/**
 * Event Preview Buttons
 *
 * @package ChoctawNation
 * @subpackage Events
 */

$location_terms = get_the_terms( get_the_ID(), 'event_location' );
?>
<div class="mt-auto d-flex align-items-stretch gap-3 position-relative">
	<a class="text-secondary text-decoration-none d-flex align-items-center" href="<?php echo $location_terms[0]->slug; ?>">
		<i class="fa fa-solid fa-location-dot"></i>
		&nbsp;
		<?php echo $location_terms[0]->name; ?>
	</a>
	<button class="text-black bg-transparent border-0 d-flex align-items-center">
		<i class="fa fa-solid fa-share"></i>
		&nbsp;Share
	</button>
	<button class="text-primary bg-transparent border-0 d-flex align-items-center" data-add-to-schedule='true' data-id="<?php echo get_the_ID(); ?>"><i
		   class="fa fa-solid fa-plus"></i>&nbsp;Add to Schedule</button>
	<a href="<?php the_permalink(); ?>" class="text-primary text-decoration-none d-flex align-items-center"><i class="fa fa-solid fa-circle-info"></i>&nbsp;Learn More</a>
</div>