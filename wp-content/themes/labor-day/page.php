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
		<?php
		$default_output = "<div>";
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