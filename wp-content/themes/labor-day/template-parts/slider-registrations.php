<?php
/** Registrations Slider
 * powered by swiper.js
 */

$query = new WP_Query(
	array(
		'post_type'      => 'page',
		'post_status'    => 'publish',
		'post_parent'    => get_page_by_title( 'Registrations' )->ID,
		'posts_per_page' => -1,
	)
);
?>

<div class='row'>
	<div class="col-1 d-flex justify-content-center">
		<div class="registration-slider-navigation swiper-button-prev"></div>
	</div>
	<div class="col-10">
		<div class="container">
			<div class="swiper" id="registration-slider">
				<div class="swiper-wrapper">
					<?php
					if ( $query->have_posts() ) :
						while ( $query->have_posts() ) :
							$query->the_post();
							?>
					<div class="swiper-slide">
						<a href="<?php the_permalink(); ?>">
							<div class="slider__image mb-4">
								<?php the_post_thumbnail( 'medium_large' ); ?>
							</div>
							<?php the_title( "<h4 class='slider__info'>", '</h4>' ); ?>
						</a>
					</div>
					<?php endwhile; ?>
					<?php endif; ?>
				</div>
				<div class="swiper-pagination"></div>
			</div>
		</div>
	</div>
	<div class="col-1 d-flex justify-content-center">
		<div class="registration-slider-navigation swiper-button-next"></div>
	</div>
</div>

<?php
wp_reset_postdata();