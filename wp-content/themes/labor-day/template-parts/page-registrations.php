<?php

/**
 * Page Name: Registrations
 */

global $post;
$current_id = get_the_ID();

$args = array(
	'post_type'      => 'page',
	'post_parent'    => $current_id,
	'orderby'        => 'menu_order',
	'order'          => 'ASC',
	'posts_per_page' => -1,
);

$query = new WP_Query($args);
cno_enqueue_page_assets('registrations', array());
$content = new ContentSectionComponents();
?>
<section class="registrations">
	<div class="container">
		<?php if ($query->have_posts()) : ?>
			<ul class="registration-form-list">
				<?php while ($query->have_posts()) : $query->the_post(); ?>
					<li class="registration-form-list__item">
						<article class="registration-form">
							<?php $content->two_col_text_and_media(array(
								'split'				=> [4, 8],
								'headline'   		=> get_the_title(),
								'headline_element'	=> 'h3',
								'headline_class'	=> 'registration-form__content--headline',
								'content'    		=> get_field('hero')['subheadline'],
								'content_wrapper' 	=> 'p',
								'content_class' 	=> 'registration-form__content--subheadline',
								'cta_text'   		=> 'Apply Now',
								'cta_link'   		=> get_the_permalink(),
								'cta_external' 		=> false,
								'cta_class' 		=> 'btn__fill--primary registration-form__button',
								'media_type' 		=> 'photo',
								'reverse'    		=> false,
								'image_src'  		=> get_the_post_thumbnail_url(size: 'large')
							)); ?>
						</article>
					</li>
				<?php endwhile; ?>
			</ul>
		<?php endif; ?>
	</div>
</section>