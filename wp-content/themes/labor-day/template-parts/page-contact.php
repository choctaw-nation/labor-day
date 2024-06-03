<?php
/**
 * Page: Contact Us
 *
 * @package ChoctawNation
 */

?>
<section class="container py-0">
	<?php $form = get_field( 'form' ); ?>
	<?php echo do_shortcode( $form ); ?>
	<div class="row">
		<div class='col'>
			<?php get_template_part( 'template-parts/registrations/content-recaptcha-notice' ); ?>
		</div>
	</div>
</section>
