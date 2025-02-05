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
	<button class="text-black bg-transparent border-0 d-flex align-items-center" data-bs-toggle="modal" data-bs-target="#shareEventModal">
		<i class="fa fa-solid fa-share"></i>
		&nbsp;Share
	</button>
	<button class="add-to-schedule text-primary bg-transparent border-0 d-flex align-items-center" data-id="<?php echo get_the_ID(); ?>"><i class="fa fa-solid fa-plus"></i>&nbsp;Add to
		Schedule</button>
	<?php if ( get_field( 'description' ) ) : ?>
	<a href="<?php the_permalink(); ?>" class="text-primary text-decoration-none d-flex align-items-center"><i class="fa fa-solid fa-circle-info"></i>&nbsp;Learn More</a>
	<?php endif; ?>
</div>