<?php
/**
 * Page: Map
 *
 * @package ChoctawNation
 */

$cno_map    = new Content_Map();
$map_assets = new Asset_Loader( 'map', Enqueue_Type::both, 'pages' );
?>
<div class="container map-container">
	<figure class="map-figure">
		<?php $cno_map->the_map(); ?>
	</figure>
	<div class="legend">
		<div class="map-toggles__container">
			<div class="map-toggles__buildings">
				<h3 class="headline">Buildings & Locations</h3>
				<div class="map-toggles__area-toggles">
					<label class='map-toggles__layer-toggle'>
						<input type='checkbox' data-selector="buildings" class="toggle-all" />&nbsp;Toggle All
					</label>
					<?php echo $cno_map->get_the_building_checkboxes(); ?>
				</div>
			</div>
			<div class="map-toggles__container--icons">
				<div class="map-toggles__icons">
					<h3 class="headline">Key Areas</h3>
					<div class="map-toggles__area-toggles">
						<label class='map-toggles__layer-toggle'>
							<input type='checkbox' data-selector="icons" class="toggle-all" />&nbsp;Toggle All
						</label>
						<?php echo $cno_map->get_the_area_checkboxes(); ?>
					</div>
				</div>
			</div>
			<div class="map-toggles__container--locations">
				<div class="map-toggles__locations">
					<h3 class="headline">Labels</h3>
					<div class="map-toggles__area-toggles">
						<label class='map-toggles__layer-toggle'>
							<input type='checkbox' data-selector="locations" class="toggle-all" />&nbsp;Toggle All
						</label>
						<?php echo $cno_map->get_the_label_checkboxes(); ?>
					</div>
				</div>
			</div>
		</div>


	</div>
</div>