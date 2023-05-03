<?php

/** 
 * Page: Festival Information
 * 
 */
$content = new ContentSections();
?>
<section id="faqs">
	<?php extract(get_field('faqs')); ?>
	<header class="section-header">
		<figure class="section-header__banner-image">
			<img src="<?php echo $banner; ?>" alt="">
		</figure>
		<h2 class="section-header__headline headline">
			<?php echo $headline; ?>
		</h2>
		<span class="section-header__subheadline subheadline">
			<?php echo $subheadline; ?>
		</span>
	</header>
	<?php $repeater = get_field('faqs'); ?>
	<?php foreach ($repeater as $key => $field) {
	} ?>
</section>

<section id="general-rules">
	<?php extract(get_field('general_rules')); ?>
	<header class="section-header">
		<figure class="section-header__banner-image">
			<img src="<?php echo $banner; ?>" alt="">
		</figure>
		<h2 class="section-header__headline headline">
			<?php echo $headline; ?>
		</h2>
	</header>
	<?php $repeater = get_field('rules'); ?>
	<?php foreach ($repeater as $field) {
	} ?>

</section>