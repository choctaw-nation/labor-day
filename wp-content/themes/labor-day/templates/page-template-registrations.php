<?php
/**
 * Template Name: Registrations Page
 * Handles the output of Registration Pages
 *
 * @package ChoctawNation
 */

$background_image_url = get_field( 'hero' )['background_image'];
get_header();
?>
<main class="site-content">
	<section class="container my-5">
		<?php $form = get_field( 'form' ); ?>
		<?php echo do_shortcode( $form ); ?>
	</section>
</main>
<?php
get_footer();