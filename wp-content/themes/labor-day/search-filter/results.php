<?php
/**
 * The Search & Filter Results Template
 *
 * @package ChoctawNation
 * @subpackage SearchAndFilter
 */

?>
<?php if ( have_posts() ) : ?>
<section class="container my-4 d-flex flex-column row-gap-4">
	<ul class="list-unstyled d-flex flex-column my-0 row-gap-4" id="search-results">
		<?php
		while ( have_posts() ) {
			the_post();
			echo '<li class="row gx-0 column-gap-3">';
			get_template_part( 'template-parts/events/content', 'event-display' );
			echo '</li>';
		}
		wp_reset_postdata();
		?>
	</ul>
	<div class="d-flex justify-content-center">
		<?php echo do_shortcode( '[searchandfilter field="Load More"]' ); ?>
	</div>
	<?php else : ?>
	<p>No events found.</p>
</section>
<?php endif; ?>
