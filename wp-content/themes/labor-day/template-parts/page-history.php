<?php

/** 
 * Page: History
 * 
 */


function display_gallery() {
	$gallery = get_field('gallery');
	$bs_col = 12 / count($gallery);

	$markup = '<div class="container"><div class="row">';
	foreach ($gallery as $item) {
		$markup .= "<figure class='col-lg-{$bs_col} gallery__item'><img class='gallery__item--image' src='{$item}' /></figure>";
	}
	$markup .= "</div></div>";
	echo $markup;
}
$content = new ContentSections();
?>
<aside class="gallery">
	<div class="container">
		<div class="row">
			<?php display_gallery(); ?>
		</div>
	</div>
</aside>
<?php get_template_part('template-parts/aside', 'text-callout', array('color' => 'primary')); ?>
<section class="fadeIn" id="capitol">
	<div class="container">
		<?php extract(get_field('capitol')); ?>
		<?php $args = array(
			'headline'	=> $headline,
			'content'	=> $subheadline,
			'reverse'	=> true
		);
		if (isset($image['url'])) $args['image_src'] = $image['url']; ?>
		<?php $content->two_col_text_and_media($args); ?>
	</div>
</section>
<section class="fadeIn" id="history">
	<div class="container">
		<?php extract(get_field('history')); ?>
		<?php $args = array(
			'headline'	=> $headline,
			'content'	=> $subheadline,
		);
		if (isset($image['url'])) $args['image_src'] = $image['url']; ?>
		<?php $content->two_col_text_and_media($args); ?>
	</div>
</section>
<section class="fadeIn" id="traditions">
	<div class="container">
		<?php extract(get_field('traditions')); ?>
		<?php $args = array(
			'headline'	=> $headline,
			'content'	=> $subheadline,
			'reverse'	=> true,
		);
		if (isset($image['url'])) $args['image_src'] = $image['url']; ?>
		<?php $content->two_col_text_and_media($args); ?>
	</div>
</section>
<aside class="fadeIn" id="video"></aside>