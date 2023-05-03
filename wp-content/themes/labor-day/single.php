<?php
/**
 * Single Display
 *
 * @package ChoctawNation
 */

get_header();
?>
<article <?php post_class(); ?>>
	<div class="container my-5 py-5">
		<?php if ('entertainment' === get_post_type() || 'events' === get_post_type()) : ?>
			<?php get_template_part('template-parts/single', get_post_type()); ?>
		<?php else : ?>
			<?php the_title("<h1>", "</h1>"); ?>
		<p>This page has no content.</p>
		<?php endif; ?>
	</div>
</article>
<?php get_footer();
