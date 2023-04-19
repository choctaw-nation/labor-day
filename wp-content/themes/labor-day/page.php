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
	<?php if ($background_image_url) : ?>
	<section class='w-100 hero--image' id='hero' style="background-image:url('<?php echo $background_image_url; ?>')"></section>
	<div class="container my-5 py-5">
		<?php the_title("<h1 class='headline'>", "</h1>"); ?>
		<span
			  class="subheadline mb-5"><?php echo empty(get_field('hero')['subheadline']) ? acf_get_field('hero')['sub_fields'][0]['default_value'] : get_field('hero')['subheadline']; ?></span>
	</div>
	<?php else : ?>
	<section class='w-100 hero--color' id='hero' style='background-color:var(--color-tertiary);'>
		<div class="container">
			<?php the_title("<h1 class='headline'>", "</h1>"); ?>
			<span
				  class="subheadline mb-5 text-center"><?php echo empty(get_field('hero')['subheadline']) ? acf_get_field('hero')['sub_fields'][0]['default_value'] : get_field('hero')['subheadline']; ?></span>
		</div>
	</section>
	<?php endif; ?>
	<?php
	$default_output = "<div class='mt-5'>";
	$default_output .= get_the_content();
	$default_output .= "</div>";
	switch ($post->post_name) {
		case 'registrations':
			get_template_part('template-parts/page', 'registrations');
			break;
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
		case 'my-schedule':
			get_template_part('template-parts/page', 'my-schedule');
			break;
		default:
			echo $default_output;
	} ?>

</main>
<?php get_footer(); ?>