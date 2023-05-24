<?php
/**
 * Entertainment Slider
 * uses swiper.js
 */

$query = new WP_Query(
	array(
		'post_type'      => 'events',
		'post_status'    => 'publish',
		'posts_per_page' => 12,
		'tax_query'      => array(
			array(
				'taxonomy' => 'event_type',
				'field'    => 'slug',
				'terms'    => 'entertainment',
			),
		),
	)
);
?>
<div class="container-fluid pb-5 position-relative">
	<div class="row">
		<div class="col-1 d-flex justify-content-center">
			<div class="swiper-button-prev"></div>
		</div>
		<div class="col-10">
			<div class="swiper">
				<div class="swiper-container" id="entertainment-slider">
					<div class="swiper-wrapper">
						<?php
						if ( $query->have_posts() ) :
							while ( $query->have_posts() ) :
								$query->the_post();
								?>
						<div class="swiper-slide" style="background-image: url('<?php echo get_the_post_thumbnail_url(); ?>');">
							<a href="<?php echo get_the_permalink(); ?>">
								<?php extract( get_field( 'info' ) ); ?>
								<div class="swiper__slide-content">
									<span class="swiper__slide-content--title"><?php the_title(); ?></span><br />
									<i class="fa-regular fa-calendar"></i>&nbsp;<?php echo $day . ', ' . cno_get_the_date( $day ); ?><br />
									<i class="fa-regular fa-clock"></i>&nbsp;<?php echo $start_time; ?>
								</div>
							</a>
						</div>
						<?php endwhile; ?>
					</div>
					<?php endif; ?>
					<div class="swiper-pagination"></div>
				</div>
			</div>
		</div>
		<div class="col-1 d-flex justify-content-center">
			<div class="swiper-button-next"></div>
		</div>
	</div>
</div>
<?php
wp_reset_postdata();