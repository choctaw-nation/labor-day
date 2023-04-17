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
$content = new ContentSectionComponents();
enqueue_page_assets('history', array());

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
		<?php $content->two_col_text_and_media(array(
			'headline'	=> $headline,
			'content'	=> $subheadline,
			'source_url' => $image
		)); ?>
	</div>
</section>
<section class="fadeIn" id="history">
	<div class="container">
		<?php extract(get_field('history')); ?>
		<?php $content->two_col_text_and_media(array(
			'headline'	=> $headline,
			'content'	=> $subheadline,
			'source_url' => $image,
			'reverse'	=> true
		)); ?>
	</div>
</section>
<section class="fadeIn" id="traditions">
	<div class="container">
		<?php extract(get_field('traditions')); ?>
		<?php $content->two_col_text_and_media(array(
			'headline'	=> $headline,
			'content'	=> $subheadline,
			'source_url' => $image
		)); ?>
	</div>
</section>
<aside class="fadeIn" id="video"></aside>