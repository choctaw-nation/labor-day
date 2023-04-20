<?php

/**
 * Slider Container
 * uses swiper.js
 * 
 * $args expects:
 * 'query_args' => array(...WP Query Args),
 * 'id'		=> ''
 */
extract($args);
$slider_name = $id;
$query = new WP_Query($query_args);
// var_dump($query);
?>
<div class="slider">
	<div class="swiper">
		<div class="swiper-container" id="<?php echo $id . '-slider'; ?>">
			<?php if ($query->have_posts()) : ?>
				<div class="swiper-wrapper">
					<?php while ($query->have_posts()) : $query->the_post(); ?>
						<div class="swiper-slide">
							<?php if ('entertainment' === $slider_name) : get_template_part('template-parts/content', 'event-display'); ?>
							<?php elseif ('registration' === $slider_name) : ?>
								<div class="slider__image">
									<?php the_post_thumbnail(); ?>
								</div>
								<?php the_title("<h4 class='slider__info'>", "</h4>"); ?>
								<div class="slider__buttons">
									<a href="<?php the_permalink(); ?>" class="btn__fill--secondary">Register Now</a>
								</div>
							<?php endif; ?>
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