<?php
/**
 * Page Name: Registrations
 *
 * @package ChoctawNation
 * @since 1.0
 */

$args = array(
	'post_type'      => 'page',
	'post_parent'    => $post->ID,
	'orderby'        => 'title',
	'order'          => 'ASC',
	'posts_per_page' => -1,
	'post_status'    => 'publish',
);

$registrations = new WP_Query( $args );

?>
<section class="registrations">
	<div class="container">
		<?php if ( $registrations->have_posts() ) : ?>
		<ul class="registration-form-list">
			<?php
			while ( $registrations->have_posts() ) {
				$registrations->the_post();
				get_template_part( 'template-parts/registrations/content', 'registration-preview' );
			}
			?>
		</ul>
		<?php else : ?>
		<p>Registrations have not opened yet. Check back later.</p>
		<?php endif; ?>
	</div>
</section>