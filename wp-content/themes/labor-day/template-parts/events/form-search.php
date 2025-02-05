<?php
/**
 * Search and Filter Search Bar
 *
 * @package ChoctawNation
 */

?>
<section class="text-bg-primary py-5">
	<div class="container d-flex flex-column row-gap-5 row-gap-lg-3">
		<div class="row">
			<div class="col">
				<?php echo do_shortcode( '[searchandfilter field="Search"]' ); ?>
			</div>
		</div>
		<div class="row row-cols-1 row-cols-md-auto gx-0 gap-3">
			<?php
			$fields = array( 'Event Date', 'Event Type', 'Location', 'Reset' );
			foreach ( $fields as $field ) {
				echo '<div class="col">';
				echo do_shortcode( '[searchandfilter field="' . $field . '"]' );
				echo '</div>';
			}
			?>
		</div>
	</div>
</section>