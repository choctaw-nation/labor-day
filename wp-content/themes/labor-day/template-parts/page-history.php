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
<article class="container d-flex flex-column row-gap-5 mb-5">
	<section id="capitol">
		<?php
		extract( get_field( 'capitol' ) );
		$args = array(
			'headline' => $headline,
			'content'  => $subheadline,
			'reverse'  => true,
			'image'    => $image,
		);
		$content->two_col_text_and_media( $args );
		?>
	</section>
	<section id="history">
		<?php extract( get_field( 'history' ) ); ?>
		<?php
			$args = array(
				'headline' => $headline,
				'content'  => $subheadline,
				'image'    => $image,
			);
			?>
		<?php $content->two_col_text_and_media( $args ); ?>
	</section>
	<section id="traditions">
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
	</section>
</article>
<?php get_template_part( 'template-parts/aside', 'text-callout', array( 'color' => 'primary' ) ); ?>