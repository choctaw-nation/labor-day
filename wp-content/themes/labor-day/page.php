<?php

/**
 * Page Template
 * 
 * @author KJ Roelke
 * @since  1.0
 */

$content = new ContentSectionComponents();
global $post;
get_header();
?>
<main class="site-content">
	<?php $background_image_url = get_field('hero')['background_image']; ?>
	<section class='w-100' style="background-image:url('<?php echo $background_image_url; ?>');" id='hero'>
	</section>
	<div class="container py-5">
		<h1 class="headline mt-5"><?php the_title(); ?></h1>
		<span
			  class="subheadline mb-5"><?php echo empty(get_field('hero')['subheadline']) ? acf_get_field('hero')['sub_fields'][0]['default_value'] : get_field('hero')['subheadline']; ?></span>
		<?php
		$default_output = "<div class='mt-5'>";
		$default_output .= get_the_content();
		$default_output .= "</div>";
		switch ($post->post_name) {
			case 'schedule':
				get_template_part('template-parts/page', 'schedule');
				break;
			case 'map':
				get_template_part('template-parts/page', 'map');
				break;
			case 'history':
				get_template_part('template-parts/page', 'history');
				break;
			case 'contact':
				get_template_part('template-parts/page', 'contact');
				break;
			default:
				echo $default_output;
		} ?>
	</div>
</main>
<?php get_footer(); ?>