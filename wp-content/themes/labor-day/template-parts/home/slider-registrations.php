<?php
/**
 * Registrations Slider
 * powered by swiper.js
 *
 * @package ChoctawNation
 */

/**
 * The page ID whose children makes up the slider slides
 *
 * @var int $registrations_page_id
 */
$registrations_page_id = 9;
$query                 = new WP_Query(
	array(
		'post_type'      => 'page',
		'post_status'    => 'publish',
		'post_parent'    => $registrations_page_id,
		'posts_per_page' => -1,
	)
);
?>

<div class="row" style="--swiper-navigation-color: white;">
	<div class="col-1 d-flex justify-content-center position-relative">
		<div class="registration-slider-navigation swiper-button-prev"></div>
	</div>
	<div class="col-10 position-relative">
		<div class="swiper" id="registration-slider">
			<div class="swiper-wrapper">
				<?php
				if ( $query->have_posts() ) :
					while ( $query->have_posts() ) :
						$query->the_post();
						?>
				<div class="swiper-slide">
					<a href="<?php the_permalink(); ?>" class="d-flex flex-column row-gap-3">
						<div class="slider__image">
							<?php the_post_thumbnail( 'medium_large' ); ?>
						</div>
						<?php the_title( '<h4 class="text-white mb-0">', '</h4>' ); ?>
					</a>
				</div>
				<?php endwhile; ?>
				<?php endif; ?>
			</div>
		</div>
	</div>
	<div class="col-1 d-flex justify-content-center position-relative">
		<div class="registration-slider-navigation swiper-button-next"></div>
	</div>
</div>
<div class="row" style="--swiper-pagination-color: white;">
	<div class="col position-relative"><div class="swiper-pagination"></div></div>
</div>
<?php
wp_reset_postdata();
