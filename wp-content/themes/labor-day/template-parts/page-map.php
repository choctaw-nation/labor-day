<?php
/**
 * Page: Map
 */

cno_enqueue_page_assets( 'map' );

/**
 * Create labels out of an array of ids
 *
 * @param array $ids the ids to create checkboxes for.
 */
function cno_create_checkboxes( array $ids ): void {
	foreach ( $ids as $id ) {
		$checked = isset( $id['checked'] ) && true === $id['checked'] ? 'checked' : '';
			echo "<label class='map-toggles__layer-toggle'><input type='checkbox'  {$checked} data-id='{$id['id']}' />&nbsp;{$id['label']}</label>";
	}
}

?>
<div class="container map-container">
	<figure class="map-figure">
		<img src="<?php echo get_template_directory_uri() . '/images/map-v3/base-v2.png'; ?>" class='map__base' />
		<img src="<?php echo get_template_directory_uri() . '/images/map-v3/base__buildings.png'; ?>" class="map__base--buildings" />
		<?php echo file_get_contents( get_theme_file_path( '/images/map-v3/svgs/zones.svg' ) ); ?>
		<?php
		$images = array(
			array(
				'name' => '5k',
			),
			array(
				'name' => 'ampitheater',
			),
			array(
				'name' => 'arts-and-crafts',
				'id' => ''
			),
			array(
				'name' => 'cafeteria',
				'id' => ''
			),
			array(
				'name' => 'capitol-museum',
				'id' => ''
			),
			array(
				'name' => 'chapel',
				'id' => ''
			),
			array(
				'name' => 'choctaw-village',
				'id' => ''
			),
			array(
				'name' => 'greenhouse',
				'id' => ''
			),
			array(
				'name' => 'ice-house',
				'id' => ''
			),
			array(
				'name' => 'lost-child',
				'id' => ''
			),
			array(
				'name' => 'red-warrior-ball-field',
				'id' => 'red-warrior-ball-park'
			),
			array(
				'name' => 'red-warrior-park',
				'id' => ''
			),
			array(
				'name' => 'stickball-field',
				'id' => ''
			),
			array(
				'name' => 'cemetery',
				'id' => 'veterans-cemetery'
			),
		);
		?>
		<?php foreach ($images as $image) {
			$src = get_template_directory_uri() . "/images/map-v3/buildings/{$image['name']}.png";
			$id = empty($image['id']) ? $image['name'] : $image['id'];
			echo "<img src='{$src}' id='{$id}' class='map__base--buildings' />";
		}
		?>
		<?php echo file_get_contents( get_theme_file_path( '/images/map-v3/svgs/icons-areas-labels-v2.4.svg' ) ); ?>
	</figure>
	<div class="legend">
		<div class="map-toggles__container">
			<div class="map-toggles__buildings">
				<h3 class="headline">Buildings & Locations</h3>
				<div class="map-toggles__area-toggles">
					<label class='map-toggles__layer-toggle'>
						<input type='checkbox' data-selector="buildings" class="toggle-all" />&nbsp;Toggle All
					</label>
					<?php
					$area_ids = array(
						array(
							'id'      => 'ampitheater',
							'label'   => 'Amphitheater',
							'checked' => true,
						),
						array(
							'id'      => 'arts-and-crafts',
							'label'   => 'Arts & Crafts',
							'checked' => true,
						),
						array(
							'id'      => 'cafeteria',
							'label'   => 'Cafeteria',
							'checked' => true,
						),
						array(
							'id'      => 'capitol-museum',
							'label'   => 'Capitol Museum',
							'checked' => true,
						),
						array(
							'id'      => 'chapel',
							'label'   => 'Chapel',
							'checked' => true,
						),
						array(
							'id'      => 'choctaw-village',
							'label'   => 'Choctaw Village',
							'checked' => true,
						),
						array(
							'id'      => 'greenhouse',
							'label'   => 'Greenhouse',
							'checked' => true,
						),
						array(
							'id'      => 'ice-house',
							'label'   => 'Ice House',
							'checked' => true,
						),
						array(
							'id'      => 'lost-child',
							'label'   => 'Lost Child',
							'checked' => true,
						),
						array(
							'id'      => 'red-warrior-ball-park',
							'label'   => 'Red Warrior Ball Park',
							'checked' => true,
						),
						array(
							'id'      => 'red-warrior-park',
							'label'   => 'Red Warrior Park',
							'checked' => true,
						),
						array(
							'id'      => 'stickball-field',
							'label'   => 'Stickball Field',
							'checked' => true,
						),
						array(
							'id'      => 'veterans-cemetery',
							'label'   => 'Veterans Cemetery',
							'checked' => true,
						),
						array(
							'id'      => 'Tribal_Police',
							'label'   => 'Tribal Police',
							'checked' => true,
						),
						array(
							'id'      => '5k',
							'label'   => '5k Start / Finish',
							'checked' => true,
						),
					);
					cno_create_checkboxes($area_ids);
					?>
				</div>
			</div>
			<div class="map-toggles__container--icons">
				<div class="map-toggles__icons">
					<h3 class="headline">Key Areas</h3>
					<div class="map-toggles__area-toggles">
						<label class='map-toggles__layer-toggle'>
							<input type='checkbox' data-selector="icons" class="toggle-all" />&nbsp;Toggle All
						</label>
						<?php
						$key_area_ids = array(
							array(
								'id'      => 'Elder_Ride',
								'label'   => 'Elder Ride',
								'checked' => true,
							),
							array(
								'id'      => 'Parking',
								'label'   => 'Parking',
								'checked' => true,
							),
							array(
								'id'      => 'Associate_Parking',
								'label'   => 'Associate Parking',
								'checked' => true,
							),
							array(
								'id'      => 'Accessible_Parking',
								'label'   => 'Accessible Parking',
								'checked' => true,
							),
							array(
								'id'      => 'RV_Parking',
								'label'   => 'RV Parking',
								'checked' => true,
							),
							array(
								'id'      => 'Food',
								'label'   => 'Food',
								'checked' => true,
							),
							array(
								'id'      => 'Information',
								'label'   => 'Information',
								'checked' => true,
							),
							array(
								'id'      => 'First_Aid',
								'label'   => 'First Aid',
								'checked' => true,
							),
							array(
								'id'      => 'Restrooms',
								'label'   => 'Restrooms',
								'checked' => true,
							),
							array(
								'id'      => 'Tram_Stops',
								'label'   => 'Tram Stops',
								'checked' => true,
							),
							array(
								'id'      => 'Shower',
								'label'   => 'Showers',
								'checked' => true,
							),
							array(
								'id'      => 'Water_Station',
								'label'   => 'Water Stations',
								'checked' => true,
							),
							array(
								'id'      => 'Tent_Camping',
								'label'   => 'Tent Camping',
								'checked' => true,
							),
							array(
								'id'      => 'ATM',
								'label'   => 'ATMs',
								'checked' => true,
							),
							array(
								'id'      => 'Healthy_Living_Expo',
								'label'   => 'Healthy Living Expo',
								'checked' => true,
							),
							array(
								'id'      => 'Going_Green_Tent',
								'label'   => 'Going Green Tent',
								'checked' => true,
							),
							array(
								'id'      => 'Chahta_Cab',
								'label'   => 'Chahta Cab',
								'checked' => true,
							),
							array(
								'id'      => 'Education_Tent',
								'label'   => 'Education Tent',
								'checked' => true,
							),
							array(
								'id'      => 'Membership',
								'label'   => 'Membership',
								'checked' => true,
							),
							array(
								'id'      => 'Choctaw_Store',
								'label'   => 'Choctaw Store',
								'checked' => true,
							),
							array(
								'id'      => 'Concessions',
								'label'   => 'Concessions',
								'checked' => true,
							),
						);
						cno_create_checkboxes($key_area_ids);
						?>
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
						<?php
						$label_ids = array(
							array(
								'id'      => 'Street_Labels',
								'label'   => 'Street Names',
								'checked' => true,
							),
							array(
								'id'      => 'Zone_1',
								'label'   => 'Zone 1',
								'checked' => true,
							),
							array(
								'id'      => 'Zone_2',
								'label'   => 'Zone 2',
								'checked' => true,
							),
							array(
								'id'      => 'Zone_3',
								'label'   => 'Zone 3',
								'checked' => true,
							),
							array(
								'id'      => 'Zone_4',
								'label'   => 'Zone 4',
								'checked' => true,
							),
							array(
								'id'      => 'Zone_5',
								'label'   => 'Zone 5',
								'checked' => true,
							),
							array(
								'id'      => 'Zone_6',
								'label'   => 'Zone 6',
								'checked' => true,
							),
							array(
								'id'      => 'Zone_7',
								'label'   => 'Zone 7',
								'checked' => true,
							),
						);
						cno_create_checkboxes($label_ids);
						?>
					</div>
				</div>
			</div>
		</div>


	</div>
</div>