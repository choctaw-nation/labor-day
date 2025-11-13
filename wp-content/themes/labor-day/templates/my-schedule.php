<?php
/**
 * Template Name: My Schedule
 *
 *
 * @package ChoctawNation
 */

cno_enqueue_page_assets( 'mySchedule' );
get_header();
?>
<main <?php post_class('site-content');?>>
<div class="container">
	<div class="row">
		<?php
		get_template_part(
			'template-parts/aside',
			'breadcrumb',
			array(
				'link' => '/events',
				'text' => 'Back to All Events',
			)
		);
		?>
	</div>
</div>
<div id="app" class="container d-flex flex-column row-gap-5">This page requires Javascript to work.</div>
</main>
<?php
get_template_part( 'template-parts/events/modal', 'share-event' );
get_footer();
