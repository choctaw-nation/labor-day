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
		<div class="row">
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
		<div class="row">
			<div class="col">
				<?php the_title( '<h1>', '</h1>' ); ?>
				<?php
				if ( ! empty( $additional_info ) ) {
					echo "<div class='fs-6'>{$additional_info}</div>";
				}
				?>
			</div>
		</div>
		<div class="row fs-6">
			<?php
			$form_id = get_field( 'registration_form' );
			$href    = esc_url( get_field( 'external_registration_link' ) );
			if ( ! empty( $form_id ) && empty( $href ) ) {
				echo do_shortcode( "[gravityform id={$form_id} title='false']" );
				echo "<div class='col'>";
				get_template_part( 'template-parts/registrations/content-recaptcha-notice' );
				echo '</div>';
			} elseif ( empty( $form_id ) && ! empty( $href ) ) {
				echo "<a href='{$href}' class='btn btn-secondary w-auto mt-4' target='_blank' rel='noopener noreferrer'>Apply Here</a>";
			}
			?>
		</div>
	</section>
</main>
<?php
get_footer();
