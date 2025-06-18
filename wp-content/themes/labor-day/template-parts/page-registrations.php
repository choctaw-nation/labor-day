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

$after_list_content = get_field('after_list_content');

$registrations = new WP_Query( $args );

?>
<section class="registrations p-0">
	<div class="container">
		<?php if ( $registrations->have_posts() ) : ?>
		<ul class="registration-form-list p-0 list-unstyled">
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

<?php if ( $after_list_content ) : ?>
<section class="registrations-note p-0">
	<div class="container">
		<?php echo $after_list_content; ?>
	</div>
</section>
<?php endif; ?>
