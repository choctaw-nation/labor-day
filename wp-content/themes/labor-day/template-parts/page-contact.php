<?php

/**
 * Page: Contact Us
 */
?>
<section class="container my-5">
	<?php $form = get_field('form'); ?>
	<?php echo do_shortcode($form); ?>
</section>