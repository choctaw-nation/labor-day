<?php
/**
 * Entertainment Slider
 * uses swiper.js
 */

$query = new WP_Query(
	array(
		'post_type'      => 'events',
		'post_status'    => 'publish',
		'posts_per_page' => 30,
		'tax_query'      => array(
			array(
				'taxonomy' => 'event_type',
				'field'    => 'slug',
				'terms'    => 'entertainment',
			),
		),
	)
);
// Post IDs to Ignore because they are featured on front-page.
$ignored_post_ids = array( 50, 174, 200, 183 );
?>
<div class="pb-5 position-relative container-fluid">
	<div class="row">
		<div class="col-1 d-flex justify-content-center">
			<div class="entertainment-slider-navigation swiper-button-prev"></div>
		</div>
		<div class="col-10">
			<div class="container">
				<div class="row">
					<div class="swiper">
						<div class="swiper-container" id="entertainment-slider">
							<div class="swiper-wrapper">
								<?php
								if ( $query->have_posts() ) :
									while ( $query->have_posts() ) :
										$query->the_post();
										if ( ! in_array( get_the_ID(), $ignored_post_ids ) ) :
											?>
								<div class="swiper-slide" style="background-image: url('<?php echo get_field( 'portrait_orientation_photo' ); ?>');">
									<a href="<?php echo get_the_permalink(); ?>">
										<?php extract( get_field( 'info' ) ); ?>
										<div class="swiper__slide-content">
											<span class="swiper__slide-content--title"><?php the_title(); ?></span><br />
											<i class="fa-regular fa-calendar"></i>&nbsp;<?php echo $day . ', ' . cno_get_the_date( $day ); ?><br />
											<i class="fa-regular fa-clock"></i>&nbsp;<?php echo $start_time; ?>
										</div>
									</a>
								</div>
								<?php endif; ?>
								<?php endwhile; ?>
							</div>
							<?php endif; ?>
							<div class="swiper-pagination"></div>
						</div>
					</div>
				</div>
			</div>
		</div>
		<div class="col-1 d-flex justify-content-center">
			<div class="entertainment-slider-navigation swiper-button-next"></div>
		</div>
	</div>
</div>

<?php
wp_reset_postdata();