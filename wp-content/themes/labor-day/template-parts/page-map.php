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
		if ( 'Misc._Place_Labels' === $id['id'] ) {
			echo "<div class='map-toggles__layer-toggle' style='visibility:hidden;display:none'  data-id='{$id['id']}'><input type='checkbox' disabled {$checked} data-id='{$id['id']}' /></div>";
		} else {
			echo "<div class='map-toggles__layer-toggle' data-id='{$id['id']}'><input type='checkbox'  {$checked} data-id='{$id['id']}' />&nbsp;{$id['label']}</div>";
		}
	}
}

?>
<div class="container map-container">
	<figure class="map-figure">
		<img src="<?php echo get_template_directory_uri() . '/images/map-v2/base.png'; ?>" />
		<img src="<?php echo get_template_directory_uri() . '/images/map-v2/buildings/5k.png'; ?>" id='5k' />
		<img src="<?php echo get_template_directory_uri() . '/images/map-v2/buildings/ampitheater.png'; ?>" id='ampitheater' />
		<img src="<?php echo get_template_directory_uri() . '/images/map-v2/buildings/arts-and-crafts.png'; ?>" id='arts-and-crafts' />
		<img src="<?php echo get_template_directory_uri() . '/images/map-v2/buildings/cafeteria.png'; ?>" id='cafeteria' />
		<img src="<?php echo get_template_directory_uri() . '/images/map-v2/buildings/capitol-museum.png'; ?>" id='capitol-museum' />
		<img src="<?php echo get_template_directory_uri() . '/images/map-v2/buildings/chapel.png'; ?>" id='chapel' />
		<img src="<?php echo get_template_directory_uri() . '/images/map-v2/buildings/choctaw-village.png'; ?>" id='choctaw-village' />
		<img src="<?php echo get_template_directory_uri() . '/images/map-v2/buildings/greenhouse.png'; ?>" id='greenhouse' />
		<img src="<?php echo get_template_directory_uri() . '/images/map-v2/buildings/ice-house.png'; ?>" id='ice-house' />
		<img src="<?php echo get_template_directory_uri() . '/images/map-v2/buildings/lost-child.png'; ?>" id='lost-child' />
		<img src="<?php echo get_template_directory_uri() . '/images/map-v2/buildings/red-warrior-ball-park.png'; ?>" id='red-warrior-ball-park' />
		<img src="<?php echo get_template_directory_uri() . '/images/map-v2/buildings/red-warrior-park.png'; ?>" id='red-warrior-park' />
		<img src="<?php echo get_template_directory_uri() . '/images/map-v2/buildings/stickball-field.png'; ?>" id='stickball-field' />
		<img src="<?php echo get_template_directory_uri() . '/images/map-v2/buildings/veterans-cemetery.png'; ?>" id='veterans-cemetery' />
		<?php echo file_get_contents( get_theme_file_path( '/images/map-v2/map-icons-v2.svg' ) ); ?>
		<?php echo file_get_contents( get_theme_file_path( '/images/map-v2/street-labels.svg' ) ); ?>
	</figure>
	<div class="legend">
		<div class="map-toggles__container">
			<div class="map-toggles__areas">
				<h3 class="headline">Buildings & Locations</h3>
				<div class="map-toggles__area-toggles">
					<?php
					$area_ids = array(
						array(
							'id'      => 'ampitheater',
							'label'   => 'Ampitheater',
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
					);
					cno_create_checkboxes($area_ids);
					?>
				</div>
			</div>
			<div class="map-toggles__container--icons">
				<div class="map-toggles__icons">
					<h3 class="headline">Key Areas</h3>
					<div class="map-toggles__area-toggles">
						<?php
						$key_area_ids = array(
							array(
								'id'      => 'Parking',
								'label'   => 'Parking',
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
								'id'      => 'Misc._Place_Labels',
								'label'   => 'Misc. Place Labels',
								'checked' => true,
							),
							array(
								'id'      => 'Shower',
								'label'   => 'Showers',
							),
							array(
								'id'      => 'Water_Station',
								'label'   => 'Water Stations',
							),
							array(
								'id'      => 'Concession_Stands',
								'label'   => 'Concession Stands',
							),
							array(
								'id'      => 'Tent_Camping',
								'label'   => 'Tent Camping',
							),
							array(
								'id'      => 'ATM',
								'label'   => 'ATMs',
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
						<?php
						$label_ids = array(
							array(
								'id'      => 'Street_Labels',
								'label'   => 'Street Names',
								'checked' => true,
							),
							array(
								'id'      => 'Zone_Labels',
								'label'   => 'Zones',
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