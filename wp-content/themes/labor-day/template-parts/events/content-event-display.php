<?php
/**
 * The display for Events inside of a loop.
 *
 * @package LaborDay
 * @subpackage Events
 */

?>
<?php get_template_part( 'template-parts/events/event', 'time-banner' ); ?>
<div class="col-xl-5 col-xxl-4 flex-grow-1 flex-lg-grow-0 order-1 order-xl-0">
	<figure class="mb-0 ratio ratio-16x9">
		<?php
			the_post_thumbnail(
				'large',
				array(
					'loading' => 'lazy',
					'class'   => 'w-100 h-auto object-fit-cover',
				)
			);
			?>
	</figure>
</div>
<div class="col flex-grow-1 d-flex flex-column flex-wrap order-3 order-xl-0 mt-2 mt-lg-0">
	<?php the_title( '<h2 class="text-gray font-pill-gothic mb-0">', '</h2>' ); ?>
	<p class="fs-6"><?php the_field( 'archive_content' ); ?></p>
	<?php get_template_part( 'template-parts/events/event', 'buttons' ); ?>
</div>
