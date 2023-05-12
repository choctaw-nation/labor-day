<?php
/**
 * Page: Map
 */

cno_enqueue_page_assets( 'map' );
?>
<div class="map-toggles__container">
	<div class="container">
		<div class="map-toggles__areas">
			<h3 class="headline text-white">Show / Hide Areas</h3>
			<div class="map-toggles__area-toggles">
				<div class='map-toggles__layer-toggle' data-id="Parking">
					<input type='checkbox' checked data-id="Parking" />&nbsp;Parking
				</div>
				<div class='map-toggles__layer-toggle' data-id="Tent_Camping">
					<input type='checkbox' checked data-id="Tent_Camping" />&nbsp;Tent Camping
				</div>
				<div class='map-toggles__layer-toggle' data-id="RV_Camping">
					<input type='checkbox' checked data-id="RV_Camping" />&nbsp;RV Camping
				</div>
				<div class='map-toggles__layer-toggle' data-id="Culture_History">
					<input type='checkbox' checked data-id="Culture_History" />&nbsp;Culture & History
				</div>
				<div class='map-toggles__layer-toggle' data-id="Recreation_Area">
					<input type='checkbox' checked data-id="Recreation_Area" />&nbsp;Recreation Areas
				</div>
				<div class='map-toggles__layer-toggle' data-id="Sports_Fields">
					<input type='checkbox' checked data-id="Sports_Fields" />&nbsp;Sports Fields
				</div>
				<div class='map-toggles__layer-toggle' data-id="Food_Vendors">
					<input type='checkbox' checked data-id="Food_Vendors" />&nbsp;Food Vendors
				</div>
				<!-- <div class='map-toggles__layer-toggle'>
					<input type='checkbox' checked disabled />&nbsp;Walkways
				</div> -->
				<div class='map-toggles__layer-toggle' data-id="Tram">
					<input type='checkbox' checked data-id="Tram" />&nbsp;Trams
				</div>
				<div class='map-toggles__layer-toggle' data-id="Icons">
					<input type='checkbox' checked data-id="Icons" />&nbsp;All Icons
				</div>
			</div>
		</div>

	</div>
</div>
<div class="map-toggles__container--icons">
	<div class="container">
		<div class="map-toggles__icons">
			<h3 class="headline text-white">Show / Hide Icons</h3>
			<div class="map-toggles__area-toggles">
				<div class='map-toggles__layer-toggle'>
					<input type='checkbox' checked />&nbsp;ATMs
				</div>
				<div class='map-toggles__layer-toggle'>
					<input type='checkbox' checked />&nbsp;Misc.
				</div>
				<div class='map-toggles__layer-toggle'>
					<input type='checkbox' checked />&nbsp;Water Stations
				</div>
				<div class='map-toggles__layer-toggle'>
					<input type='checkbox' checked />&nbsp;First Aid
				</div>
				<div class='map-toggles__layer-toggle'>
					<input type='checkbox' checked />&nbsp;Concessions
				</div>
				<div class='map-toggles__layer-toggle'>
					<input type='checkbox' checked />&nbsp;Ice Boxes
				</div>
				<div class='map-toggles__layer-toggle'>
					<input type='checkbox' checked />&nbsp;Elderly / Disabled Pickup
				</div>
				<div class='map-toggles__layer-toggle'>
					<input type='checkbox' checked />&nbsp;Playgrounds
				</div>
				<div class='map-toggles__layer-toggle'>
					<input type='checkbox' checked />&nbsp;Restrooms
				</div>
				<div class='map-toggles__layer-toggle'>
					<input type='checkbox' checked />&nbsp;Bath Houses
				</div>
				<div class='map-toggles__layer-toggle'>
					<input type='checkbox' checked />&nbsp;Wristband Stations
				</div>
				<div class='map-toggles__layer-toggle'>
					<input type='checkbox' checked />&nbsp;All Locations
				</div>
			</div>
		</div>
	</div>
</div>
<figure class="map">
	<?php echo file_get_contents( get_theme_file_path( '/images/full-map-v2.svg' ) ); ?>
</figure>