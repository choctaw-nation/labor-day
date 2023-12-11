<?php
/**
 * Page: History
 *
 * @package ChoctawNation
 * @since 1.0
 */

use ChoctawNation\Content\Sections;

$content = new Sections();
?>
<section id="capitol">
	<div class="container">
		<?php extract( get_field( 'capitol' ) ); ?>
		<?php
		$args = array(
			'headline' => $headline,
			'content'  => $subheadline,
			'reverse'  => true,
			'image'    => $image,
		);
		?>
		<?php $content->two_col_text_and_media( $args ); ?>
	</div>
</section>
<section id="history">
	<div class="container">
		<?php extract( get_field( 'history' ) ); ?>
		<?php
		$args = array(
			'headline' => $headline,
			'content'  => $subheadline,
			'image'    => $image,
		);
		?>
		<?php $content->two_col_text_and_media( $args ); ?>
	</div>
</section>
<section id="traditions">
	<div class="container">
		<?php extract( get_field( 'traditions' ) ); ?>
		<?php
		$args = array(
			'headline' => $headline,
			'content'  => $subheadline,
			'reverse'  => true,
			'image'    => $image,
		);
		?>
		<?php $content->two_col_text_and_media( $args ); ?>
	</div>
</section>
<?php get_template_part( 'template-parts/aside', 'text-callout', array( 'color' => 'primary' ) ); ?>
<!-- <aside id="video"></aside> -->
