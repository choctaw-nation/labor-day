<?php // phpcs:ignore Squiz.Commenting.FileComment.Missing
/**
 * Page: History
 */

/** Simple gallery display */
function display_gallery() {
	$gallery = get_field( 'gallery' );
	$bs_col  = 12 / count( $gallery );

	$markup = '<div class="container"><div class="row m-0">';
	for ( $i = 0; $i < count( $gallery );$i++ ) {
		$markup .= "<figure class='col-lg-{$bs_col} gallery__item animate__animated animate__fadeInRight animate__delay-{$i}s'><img class='gallery__item--image' src='{$gallery[$i]}' /></figure>";
	}
	$markup .= '</div></div>';
	echo $markup;
}
$content = new Content_Sections();
?>
<section id="capitol">
	<div class="container">
		<?php extract( get_field( 'capitol' ) ); ?>
		<?php
		$args = array(
			'headline' => $headline,
			'content'  => $subheadline,
			'reverse'  => true,
		);
		if ( isset( $image['url'] ) ) {
			$args['image_src'] = $image['sizes']['max-landscape'];
			$args['image_alt'] = $image['alt'];
		}
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
		);
		if ( isset( $image['url'] ) ) {
			$args['image_src'] = $image['sizes']['max-landscape'];
			$args['image_alt'] = $image['alt'];
		}
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
		);
		if ( isset( $image['url'] ) ) {
			$args['image_src'] = $image['sizes']['max-landscape'];
			$args['image_alt'] = $image['alt'];
		}
		?>
		<?php $content->two_col_text_and_media( $args ); ?>
	</div>
</section>
<?php get_template_part( 'template-parts/aside', 'text-callout', array( 'color' => 'primary' ) ); ?>
<aside id="video"></aside>