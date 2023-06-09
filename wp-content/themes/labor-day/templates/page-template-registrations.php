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
		<?php
		if ( ! empty( get_field( 'registration_form' ) ) ) {
			$form = get_field( 'registration_form' );
			echo do_shortcode( "[gravityform id={$form} title='true']" );
		} else {
			the_title( '<h1>', '</h1>' );
			$href = get_field( 'external_registration_link' );
			echo "<a href='{$href}' class='btn__fill--secondary' target='_blank' rel='noopener noreferrer'>Apply Here</a>";
		}
		?>
	</section>
</main>
<?php
get_footer();