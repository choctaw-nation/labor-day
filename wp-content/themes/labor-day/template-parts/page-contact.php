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
</section>