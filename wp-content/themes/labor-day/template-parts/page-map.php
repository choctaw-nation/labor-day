<?php
/**
 * Page: Map
 *
 * @package ChoctawNation
 */

use ChoctawNation\Asset_Loader;
use ChoctawNation\Map\Map;
use ChoctawNation\Enqueue_Type;

$cno_map    = new Map();
$map_assets = new Asset_Loader( 'map', Enqueue_Type::both, 'pages' );
?>
<div class="container map-container">
	<figure class="map-figure position-relative">
		<?php $cno_map->the_map(); ?>
	</figure>
	<div class="legend bg-tertiary">
		<div class="map-toggles__container p-3 d-flex flex-column align-items-stretch row-gap-5">
			<div class="map-toggles__buildings">
				<h3>Buildings & Locations</h3>
				<div class="map-toggles__area-toggles d-grid gap-3">
					<label class='map-toggles__layer-toggle d-flex align-items-center'>
						<input type='checkbox' data-selector="buildings" class="toggle-all" />&nbsp;Toggle All
					</label>
					<?php echo $cno_map->get_the_building_checkboxes(); ?>
				</div>
			</div>
			<div class="map-toggles__container--icons">
				<div class="map-toggles__icons">
					<h3>Key Areas</h3>
					<div class="map-toggles__area-toggles d-grid gap-3">
						<label class='map-toggles__layer-toggle d-flex align-items-center'>
							<input type='checkbox' data-selector="icons" class="toggle-all" />&nbsp;Toggle All
						</label>
						<?php echo $cno_map->get_the_area_checkboxes(); ?>
					</div>
				</div>
			</div>
			<div class="map-toggles__container--locations">
				<div class="map-toggles__locations">
					<h3>Labels</h3>
					<div class="map-toggles__area-toggles d-grid gap-3">
						<label class='map-toggles__layer-toggle d-flex align-items-center'>
							<input type='checkbox' data-selector="locations" class="toggle-all" />&nbsp;Toggle All
						</label>
						<?php echo $cno_map->get_the_label_checkboxes(); ?>
					</div>
				</div>
			</div>
		</div>


	</div>
</div>