<?php
/**
 * The Search & Filter Results Template
 *
 * @package ChoctawNation
 * @subpackage SearchAndFilter
 */

?>
<?php if ( have_posts() ) : ?>
<ul class="container my-5 list-unstyled m-0 px-3 mx-auto d-flex flex-column row-gap-5" id="search-results">
	<?php
	while ( have_posts() ) {
		the_post();
		echo '<li class="row gx-0 column-gap-3 column-gap-md-3">';
		get_template_part( 'template-parts/events/content', 'event-display' );
		echo '</li>';
	}
	wp_reset_postdata();
	?>
</ul>
<div class="container d-flex justify-content-center">
	<?php echo do_shortcode( '[searchandfilter field="Load More"]' ); ?>
</div>
<?php else : ?>
<section class="container my-5">
	<p>No events found.</p>
</section>
<?php endif; ?>