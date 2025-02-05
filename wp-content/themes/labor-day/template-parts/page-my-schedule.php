<?php
/**
 * Page: My Schedule
 *
 * @package ChoctawNation
 */

cno_enqueue_page_assets( 'mySchedule' );
?>
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
<div id="app">This page requires Javascript to work.</div>
<?php
get_template_part( 'template-parts/events/modal', 'share-event' );
