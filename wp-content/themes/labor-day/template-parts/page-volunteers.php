<?php

/**
 * Page: Festival Information
 *
 */
$content = new ContentSections();
?>
<section id="parking" class="fadeIn">
	<?php extract(get_field('section_3')); ?>
	<div class="container">
		<?php $args = array(
			'headline'          => $headline,
			'headline_element'  => 'h2',
			'headline_class'    => 'headline',
			'content'           => sanitize_textarea_field($subheadline),
			'content_wrapper'   => 'p',
			'content_class'     => 'text-content mb-5',
			'reverse'           => false,
			'image_src'         => $image,
		); ?>
		<?php $content->two_col_text_and_media($args); ?>
	</div>
</section>
<section id="check-in" class="fadeIn">
	<?php extract(get_field('section_4')); ?>
	<div class="container">
		<?php $args = array(
			'headline'          => $headline,
			'headline_element'  => 'h2',
			'headline_class'    => 'headline',
			'content'           => sanitize_textarea_field($subheadline),
			'content_wrapper'   => 'p',
			'content_class'     => 'text-content mb-5',
			'reverse'           => true,
			'image_src'         => $image,
		); ?>
		<?php $content->two_col_text_and_media($args); ?>
	</div>
</section>