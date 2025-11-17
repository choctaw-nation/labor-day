<?php
/**
 * Registrations swiper
 * powered by swiper.js
 *
 * @package ChoctawNation
 */

/**
 * The page ID whose children makes up the swiper slides
 *
 * @var int $registrations_page_id
 */
$registrations_page_id = 9;
$query                 = new WP_Query(
	array(
		'post_type'      => 'page',
		'post_status'    => 'publish',
		'post_parent'    => $registrations_page_id,
		'posts_per_page' => 100,
		'orderby'        => 'post_title',
		'order'          => 'ASC',
	)
);
if ( ! $query->have_posts() ) {
	return;
}
$swiper_ui_colors = array( 'pagination-color', 'navigation-color' );
?>
<div <?php echo get_block_wrapper_attributes( array( 'style' => implode( array_map( fn( $attr ) => "--swiper-{$attr}:{$attributes['swiperUIColors']};", $swiper_ui_colors ) ) ) ); ?>>
	<div class="row">
		<div class="col-1 d-flex justify-content-center position-relative">
			<div class="registration-swiper-navigation swiper-button-prev"></div>
		</div>
		<div class="col-10 position-relative">
			<div class="swiper">
				<div class="swiper-wrapper">
					<?php while ( $query->have_posts() ) : ?>
						<?php $query->the_post(); ?>
					<div class="swiper-slide">
						<a href="<?php the_permalink(); ?>" class="d-flex flex-column row-gap-3">
							<figure class="ratio ratio-16x9 mb-0">
								<?php the_post_thumbnail( 'medium_large', array( 'loading' => 'lazy' ) ); ?>
							</figure>
							<?php the_title( '<h3 class="mb-0 h4">', '</h3>' ); ?>
						</a>
					</div>
					<?php endwhile; ?>
				</div>
			</div>
		</div>
		<div class="col-1 d-flex justify-content-center position-relative">
			<div class="registration-swiper-navigation swiper-button-next"></div>
		</div>
	</div>
	<div class="row">
		<div class="col-12 position-relative">
			<div class="swiper-pagination registration-swiper-pagination"></div>
		</div>
	</div>
	<?php wp_reset_postdata(); ?>
</div>
