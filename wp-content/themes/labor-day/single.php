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
		<?php
		if ( 'entertainment' === get_post_type() || 'events' === get_post_type() ) {
			get_template_part( 'template-parts/single', get_post_type() );
		} else {
			the_title( '<h1>', '</h1>' );
			the_content();

		}
		?>
	</div>
</article>
<?php
get_footer();
