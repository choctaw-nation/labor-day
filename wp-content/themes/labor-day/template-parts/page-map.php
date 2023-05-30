<?php
/**
 * Page: Map
 */

cno_enqueue_page_assets( 'map' );
?>
<div class="container map-container">
	<figure class="map">
		<?php echo file_get_contents( get_theme_file_path( '/images/map.svg' ) ); ?>
	</figure>
	<div class="legend">
		<div class="map-toggles__container">
			<div class="map-toggles__areas">
				<h3 class="headline">Areas</h3>
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
					<div class='map-toggles__layer-toggle' data-id="Tram">
						<input type='checkbox' checked data-id="Tram" />&nbsp;Trams
					</div>

				</div>
			</div>
			<div class="map-toggles__container--icons">
				<div class="map-toggles__icons">
					<h3 class="headline">Icons</h3>
					<div class="map-toggles__area-toggles">
						<div class='map-toggles__layer-toggle' data-id="Icons" style="display:none;" visibility='hidden'>
							<input type='checkbox' checked data-id="Icons" disabled />&nbsp;All Icons
						</div>
						<div class='map-toggles__layer-toggle' data-id="ATM">
							<input type='checkbox' data-id="ATM" />&nbsp;ATMs
						</div>
						<div class='map-toggles__layer-toggle' data-id="Misc">
							<input type='checkbox' data-id="Misc" />&nbsp;Misc.
						</div>
						<div class='map-toggles__layer-toggle' data-id="Water_Station">
							<input type='checkbox' data-id="Water_Station" />&nbsp;Water Stations
						</div>
						<div class='map-toggles__layer-toggle' data-id="First_Aid">
							<input type='checkbox' data-id="First_Aid" />&nbsp;First Aid
						</div>
						<div class='map-toggles__layer-toggle' data-id="Concession">
							<input type='checkbox' data-id="Concession" />&nbsp;Concessions
						</div>
						<div class='map-toggles__layer-toggle' data-id="Ice_box">
							<input type='checkbox' data-id="Ice_box" />&nbsp;Ice Boxes
						</div>
						<div class='map-toggles__layer-toggle' data-id="Elderly_Disabled_Pickup">
							<input type='checkbox' data-id="Elderly_Disabled_Pickup" />&nbsp;Elderly / Disabled Pickup
						</div>
						<div class='map-toggles__layer-toggle' data-id="Playground">
							<input type='checkbox' data-id="Playground" />&nbsp;Playgrounds
						</div>
						<div class='map-toggles__layer-toggle' data-id="Restrooms">
							<input type='checkbox' data-id="Restrooms" />&nbsp;Restrooms
						</div>
						<div class='map-toggles__layer-toggle' data-id="Bath_House">
							<input type='checkbox' data-id="Bath_House" />&nbsp;Bath Houses
						</div>
						<div class='map-toggles__layer-toggle' data-id="Wristband_Stations">
							<input type='checkbox' data-id="Wristband_Stations" />&nbsp;Wristband Stations
						</div>
					</div>
				</div>
			</div>
			<div class="map-toggles__container--locations">
				<div class="map-toggles__locations">
					<h3 class="headline">Location Labels</h3>
					<div class="map-toggles__area-toggles">
						<div class='map-toggles__layer-toggle' data-id="Number_Labels" visibility='hidden' style="display:none;">
							<input type='checkbox' data-id="Number_Labels" disabled />&nbsp;All Locations
						</div>
						<div class="map-toggles__layer-toggle" data-id="_1">
							<input type="checkbox" data-id="_1" name="Chapel" id="chapel" />&nbsp;1.) Chapel
						</div>
						<div class="map-toggles__layer-toggle" data-id="_2">
							<input type="checkbox" data-id="_2" name="Greenhouse" id="greenhouse" />&nbsp;2.) Greenhouse
						</div>
						<div class="map-toggles__layer-toggle" data-id="_3">
							<input type="checkbox" data-id="_3" name="Lost Child" id="lost-child" />&nbsp;3.) Lost Child
						</div>
						<div class="map-toggles__layer-toggle" data-id="_4">
							<input type="checkbox" data-id="_4" name="Veterans Memorial" id="veterans-memorial" />&nbsp;4.) Veterans Memorial
						</div>
						<div class="map-toggles__layer-toggle" data-id="_5">
							<input type="checkbox" data-id="_5" name="Capitol Museum" id="capitol-museum" />&nbsp;5.) Capitol / Museum
						</div>
						<div class="map-toggles__layer-toggle" data-id="_6">
							<input type="checkbox" data-id="_6" name="Council Building" id="council-building" />&nbsp;6.) Council Building
						</div>
						<div class="map-toggles__layer-toggle" data-id="_7">
							<input type="checkbox" data-id="_7" name="Volleyball" id="volleyball" />&nbsp;7.) Volleyball
						</div>
						<div class="map-toggles__layer-toggle" data-id="_8">
							<input type="checkbox" data-id="_8" name="Basketball Cornhole" id="basketball-cornhole" />&nbsp;8.) Basketball /Cornhole
						</div>
						<div class="map-toggles__layer-toggle" data-id="_9">
							<input type="checkbox" data-id="_9" name="Horseshoes" id="horseshoes" />&nbsp;9.) Horseshoes
						</div>
						<div class="map-toggles__layer-toggle" data-id="_10">
							<input type="checkbox" data-id="_10" name="Information" id="information" />&nbsp;10.) Information
						</div>
						<div class="map-toggles__layer-toggle" data-id="_11">
							<input type="checkbox" data-id="_11" name="Membership" id="membership" />&nbsp;11.) Membership
						</div>
						<div class="map-toggles__layer-toggle" data-id="_12">
							<input type="checkbox" data-id="_12" name="Cafeteria" id="cafeteria" />&nbsp;12.) Cafeteria
						</div>
						<div class="map-toggles__layer-toggle" data-id="_13">
							<input type="checkbox" data-id="_13" name="Education" id="education" />&nbsp;13.) Education
						</div>
						<div class="map-toggles__layer-toggle" data-id="_14">
							<input type="checkbox" data-id="_14" name="Choctaw Store" id="choctaw-store" />&nbsp;14.) Choctaw Store
						</div>
						<div class="map-toggles__layer-toggle" data-id="_15">
							<input type="checkbox" data-id="_15" name="Snow Cones" id="snow-cones" />&nbsp;15.) Snow Cones
						</div>
						<div class="map-toggles__layer-toggle" data-id="_16">
							<input type="checkbox" data-id="_16" name="Arts and Crafts" id="arts-and-crafts" />&nbsp;16.) Arts &amp; Crafts
						</div>
						<div class="map-toggles__layer-toggle" data-id="_17">
							<input type="checkbox" data-id="_17" name="Ampitheatre" id="ampitheatre" />&nbsp;17.) Ampitheatre
						</div>
						<div class="map-toggles__layer-toggle" data-id="_18">
							<input type="checkbox" data-id="_18" name="Headstart Daycare" id="headstart-daycare" />&nbsp;18.) Headstart / Daycare
						</div>
						<div class="map-toggles__layer-toggle" data-id="_19">
							<input type="checkbox" data-id="_19" name="Ice House" id="ice-house" />&nbsp;19.) Ice House
						</div>
						<div class="map-toggles__layer-toggle" data-id="_20">
							<input type="checkbox" data-id="_20" name="Healthy Living Expo" id="healthy-living-expo" />&nbsp;20.) Healthy Living Expo
						</div>
						<div class="map-toggles__layer-toggle" data-id="_21">
							<input type="checkbox" data-id="_21" name="5k Start Finish" id="5k-start-finish" />&nbsp;21.) 5k Start / Finish
						</div>
					</div>
				</div>
			</div>
		</div>


	</div>
</div>