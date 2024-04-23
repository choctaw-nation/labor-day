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
				'text' => 'All Events',
			)
		);
		?>
	</div>
</div>
<div id="app">This page requires Javascript to work.</div>