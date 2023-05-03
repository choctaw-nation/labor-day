<?php
/**
 * Template Name: Registrations Page
 * Handles the output of Registration Pages
 *
 * @package ChoctawNation
 */

$background_image_url = get_field('hero')['background_image'];
get_header();
?>
<main class="site-content">
	<?php if ($background_image_url) : ?>
		<section class='w-100 hero--image' id='hero' style="background-image:url('<?php echo $background_image_url; ?>')"></section>
		<div class="container my-5 py-5">
			<?php the_title("<h1 class='headline'>", "</h1>"); ?>
			<span class="subheadline mb-5"><?php echo empty(get_field('hero')['subheadline']) ? acf_get_field('hero')['sub_fields'][0]['default_value'] : get_field('hero')['subheadline']; ?></span>
		</div>
	<?php else : ?>
		<section class='w-100 hero--color' id='vendor-application-hero' style='background-color:var(--color-tertiary);'>
			<div class="container">
				<?php the_title("<h1 class='headline'>", "</h1>"); ?>
				<span class="subheadline mb-5 text-center"><?php echo empty(get_field('hero')['subheadline']) ? acf_get_field('hero')['sub_fields'][0]['default_value'] : get_field('hero')['subheadline']; ?></span>
			</div>
		</section>
	<?php endif; ?>
	<section class="container my-5">
		<?php $form = get_field('form'); ?>
		<?php echo do_shortcode($form); ?>
	</section>
</main>
<?php get_footer();

