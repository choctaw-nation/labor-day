<?php

/**
 * Slider Container
 * uses swiper.js
 * 
 * $args expects:
 * array(
 * query_args => array (
 * // WP Query Args...
 * ))
 */
extract($args);
$post_type = $query_args['post_type'];
$id = $post_type . '-slider';
$query = new WP_Query($query_args);
?>
<div class="slider">
	<div class="swiper">
		<div class="swiper-container" id="<?php echo $id; ?>">
			<?php if ($query->have_posts()) : ?>
				<div class="swiper-wrapper">
					<?php while ($query->have_posts()) : $query->the_post(); ?>
						<div class="col-lg-4 slider__item swiper-slide">
							<div class="slider__image"><?php the_post_thumbnail(); ?></div>
							<div class="slider__info"><?php the_title("<h4>", "</h4>"); ?></div>
							<?php if ('entertainment' === $post_type) {
								extract(get_field('info'));
								$date = cno_get_the_date($day);
								echo "<div class='slider__meta'>{$day}, $start_time, <a href='#'>Ampitheatre</a></div>";
							} ?>
							<div class="slider__buttons">
								<a href="#" class="btn__fill--secondary">Add to Schedule</a>
								<a href="#" class="btn__outline--secondary">See More</a>
							</div>
						</div>
					<?php endwhile; ?>
				</div>
				<div class="swiper-pagination"></div>
				<div class="swiper-button-prev"></div>
				<div class="swiper-button-next"></div>
			<?php endif;
			wp_reset_postdata(); ?>
		</div>
	</div>
</div>