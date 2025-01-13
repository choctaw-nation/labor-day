<?php
/**
 * Template Name: Registrations Page
 * Handles the output of Registration Pages
 *
 * @package ChoctawNation
 */

get_header();
?>
<div class="container">
	<?php
	get_template_part(
		'template-parts/aside',
		'breadcrumb',
		array(
			'link' => '/registrations',
			'text' => 'All Registrations',
		)
	);
	?>
</div>
<main class="site-content container">
	<section class="row">
		<div class="col fs-6">
			<?php
			the_title( '<h1>', '</h1>' );
			if ( get_field( 'additional_information' ) ) {
				the_field( 'additional_information' );
			}
			?>
		</div>
	</section>
	<section class="row fs-6">
		<?php
		$form_id          = get_field( 'registration_form' );
		$href             = esc_url( get_field( 'external_registration_link' ) );
		$is_local_form    = ! empty( $form_id ) && empty( $href );
		$is_external_form = empty( $form_id ) && ! empty( $href );
		?>
		<div class="col">
			<?php
			if ( $is_local_form ) {
				echo do_shortcode( "[gravityform id={$form_id} title='false']" );
				get_template_part( 'template-parts/registrations/content-recaptcha-notice' );
			}
			if ( $is_external_form ) {
				echo "<a href='{$href}' class='btn btn-secondary w-auto mt-4' target='_blank' rel='noopener noreferrer'>Apply Here</a>";
			}
			?>
		</div>
	</section>
</main>
<?php
get_footer();