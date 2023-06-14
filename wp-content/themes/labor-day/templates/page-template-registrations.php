<?php
/**
 * Template Name: Registrations Page
 * Handles the output of Registration Pages
 *
 * @package ChoctawNation
 */

$background_image_url = get_field( 'hero' )['background_image'];
$additional_info      = acf_esc_html( get_field( 'additional_information' ) );
get_header();
?>
<main class="site-content">
	<section class="container my-5">
		<?php the_title( '<h1>', '</h1>' ); ?>
		<?php
		if ( ! empty( $additional_info ) ) {
				echo $additional_info;
		}
		?>
		<?php
		if ( ! empty( get_field( 'registration_form' ) ) ) {
			$form = get_field( 'registration_form' );
			echo do_shortcode( "[gravityform id={$form} title='false']" );
		} else {
			$href = get_field( 'external_registration_link' );
			echo "<a href='{$href}' class='btn__fill--secondary' target='_blank' rel='noopener noreferrer'>Apply Here</a>";
		}
		?>
	</section>
</main>
<?php
get_footer();