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
if (empty($id)) $id = $query_args['post_type'];
$slider_name = $id;
$query = new WP_Query($query_args);
?>
<div class="slider">
	<div class="swiper">
		<div class="swiper-container" id="<?php echo $id . '-slider'; ?>">
			<?php if ($query->have_posts()) : ?>
			<div class="swiper-wrapper">
				<?php while ($query->have_posts()) : $query->the_post(); ?>
				<div class="swiper-slide">
					<div class="slider__image"><?php the_post_thumbnail(); ?></div>
					<?php the_title("<h4 class='slider__info'>", "</h4>"); ?>
					<?php if ('entertainment' === $slider_name) :

								extract(get_field('info'));
								$date = cno_get_the_date($day);
								echo "<div class='slider__meta'>{$day}, $start_time, <a href='#'>Ampitheatre</a></div>";
							?>
					<div class="slider__buttons">
						<a href="#" class="btn__fill--primary" data-add-to-schedule='true'>Add to Schedule</a>
						<a href="<?php the_permalink(); ?>" class="btn__outline--primary">See More</a>
					</div>
					<?php elseif ('registration' === $slider_name) : ?>
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