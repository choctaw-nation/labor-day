<?php
/** Map Builder
 *
 * @package ChoctawNation
 * @subpackage Content
 * @since 1.0
 */

namespace ChoctawNation\Content;

/** Generates the Map */
class Map {
	/** Map base (png)
	 *
	 * @var $base
	 */
	protected string $base;

	/** Map Zones (svg)
	 *
	 * @var $zones
	 */
	protected string $zones;

	/** Map buildings (png)
	 *
	 * @var $buildings
	 */
	protected string $buildings;

	/** Misc unlabeled Buildings (svg)
	 *
	 * @var $misc_buildings
	 */
	protected string $misc_buildings;

	/** The Icons (svg)
	 *
	 * @var $icons_areas_labels
	 */
	protected string $icons_areas_labels;

	// phpcs:ignore
	public function __construct() {
		$this->get_map_files();
	}

	/** Gets Map Assets from folders and assigns them to the class */
	private function get_map_files() {
		$this->base               = get_template_directory_uri() . '/images/map-v3/base-v2.png';
		$this->zones              = $this->get_svg( '/images/map-v3/svgs/zones.svg' );
		$this->buildings          = $this->get_the_buildings();
		$this->misc_buildings     = get_template_directory_uri() . '/images/map-v3/misc-buildings.png';
		$this->icons_areas_labels = $this->get_svg( '/images/map-v3/svgs/icons-areas-labels-v3.svg' );
	}

	/** Get the svg
	 *
	 * @param string $file_path the svg path
	 */
	private function get_svg( $file_path ): string {
		//phpcs:ignore WordPress.WP.AlternativeFunctions.file_get_contents_file_get_contents
		return file_get_contents( get_theme_file_path( $file_path ) );
	}

	/** Creates an image for each building */
	private function get_the_buildings(): string {
		$buildings = '';
		$images    = array(
			array(
				'name' => '5k',
			),
			array(
				'name' => 'ampitheater',
			),
			array(
				'name' => 'arts-and-crafts',
				'id'   => '',
			),
			array(
				'name' => 'cafeteria',
				'id'   => '',
			),
			array(
				'name' => 'capitol-museum',
				'id'   => '',
			),
			array(
				'name' => 'chapel',
				'id'   => '',
			),
			array(
				'name' => 'choctaw-village',
				'id'   => '',
			),
			array(
				'name' => 'greenhouse',
				'id'   => '',
			),
			array(
				'name' => 'ice-house',
				'id'   => '',
			),
			array(
				'name' => 'lost-child',
				'id'   => '',
			),
			array(
				'name' => 'red-warrior-ball-field',
				'id'   => 'red-warrior-ball-park',
			),
			array(
				'name' => 'red-warrior-park',
				'id'   => '',
			),
			array(
				'name' => 'stickball-field',
				'id'   => '',
			),
			array(
				'name' => 'cemetery',
				'id'   => 'veterans-cemetery',
			),
			array(
				'name' => 'carnival',
				'id'   => '',
			),
			array(
				'name' => 'mothers-tent',
				'id'   => '',
			),
			array(
				'name' => 'playground',
				'id'   => '',
			),
		);
		foreach ( $images as $image ) {
			$src        = get_template_directory_uri() . "/images/map-v3/buildings/{$image['name']}.png";
			$id         = empty( $image['id'] ) ? $image['name'] : $image['id'];
			$buildings .= "<img src='{$src}' id='{$id}' class='map__base--buildings' />";
		}
		return $buildings;
	}

	/** Echoes the markup for the map */
	public function the_map() {
		echo $this->get_the_map();
	}

	/** Generates the markup for the map */
	public function get_the_map(): string {
		$markup  = "<img class='map__base' src='{$this->base}'/>";
		$markup .= $this->zones;
		$markup .= $this->buildings;
		$markup .= "<img class='map__base--buildings' src='{$this->misc_buildings}'/>";
		$markup .= $this->icons_areas_labels;
		return $markup;
	}

	/** Generates the building checkbox toggles */
	public function get_the_building_checkboxes(): string {
		$building_ids = array(
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
				'id'      => 'ial-Tribal_Police',
				'label'   => 'Tribal Police',
				'checked' => true,
			),
			array(
				'id'      => '5k',
				'label'   => '5k Start / Finish',
				'checked' => true,
			),
			array(
				'id'      => 'Mother_s_Room',
				'label'   => "Mother's Room",
				'checked' => true,
			),
			array(
				'id'      => 'playground',
				'label'   => 'Playground',
				'checked' => true,
			),
			array(
				'id'      => 'carnival',
				'label'   => 'Carnival',
				'checked' => true,
			),
		);
		return $this->create_checkboxes( $building_ids );
	}

	/** Generates the key area checkbox toggles */
	public function get_the_area_checkboxes(): string {
		$area_ids = array(
			array(
				'id'      => 'ial-Elder_Ride',
				'label'   => 'Elder Ride',
				'checked' => true,
			),
			array(
				'id'      => 'ial-Parking',
				'label'   => 'Parking',
				'checked' => true,
			),
			array(
				'id'      => 'ial-Associate_Parking',
				'label'   => 'Associate Parking',
				'checked' => true,
			),
			array(
				'id'      => 'ial-Accessible_Parking',
				'label'   => 'Accessible Parking',
				'checked' => true,
			),
			array(
				'id'      => 'ial-Parking_Station',
				'label'   => 'Parking Stations',
				'checked' => true,
			),
			array(
				'id'      => 'ial-RV_Parking',
				'label'   => 'RV Parking',
				'checked' => true,
			),
			array(
				'id'      => 'ial-Food',
				'label'   => 'Food',
				'checked' => true,
			),
			array(
				'id'      => 'ial-Information',
				'label'   => 'Information',
				'checked' => true,
			),
			array(
				'id'      => 'ial-First_Aid',
				'label'   => 'First Aid',
				'checked' => true,
			),
			array(
				'id'      => 'ial-Restrooms',
				'label'   => 'Restrooms',
				'checked' => true,
			),
			array(
				'id'      => 'ial-Tram_Stops',
				'label'   => 'Tram Stops',
				'checked' => true,
			),
			array(
				'id'      => 'ial-Shower',
				'label'   => 'Showers',
				'checked' => true,
			),
			array(
				'id'      => 'ial-Water_Station',
				'label'   => 'Water Stations',
				'checked' => true,
			),
			array(
				'id'      => 'ial-Tent_Camping',
				'label'   => 'Tent Camping',
				'checked' => true,
			),
			array(
				'id'      => 'ial-ATM',
				'label'   => 'ATMs',
				'checked' => true,
			),
			array(
				'id'      => 'ial-Healthy_Living_Expo',
				'label'   => 'Healthy Living Expo',
				'checked' => true,
			),
			array(
				'id'      => 'ial-Going_Green_Tent',
				'label'   => 'Going Green Tent',
				'checked' => true,
			),
			array(
				'id'      => 'ial-Chahta_Cab',
				'label'   => 'Chahta Cab',
				'checked' => true,
			),
			array(
				'id'      => 'ial-Education_Tent',
				'label'   => 'Education Tent',
				'checked' => true,
			),
			array(
				'id'      => 'ial-Membership',
				'label'   => 'Membership',
				'checked' => true,
			),
			array(
				'id'      => 'ial-Choctaw_Store',
				'label'   => 'Choctaw Store',
				'checked' => true,
			),
			array(
				'id'      => 'ial-Concessions',
				'label'   => 'Concessions',
				'checked' => true,
			),
		);
		return $this->create_checkboxes( $area_ids );
	}

	/** Generates the labels checkbox toggles */
	public function get_the_label_checkboxes(): string {
		$label_ids = array(
			array(
				'id'      => 'ial-Street_Labels',
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
		return $this->create_checkboxes( $label_ids );
	}

	/**
	 * Create labels out of an array of ids
	 *
	 * @param array $ids the ids to create checkboxes for.
	 */
	private function create_checkboxes( array $ids ): string {
		$checkboxes = '';
		foreach ( $ids as $id ) {
			$checked         = isset( $id['checked'] ) && true === $id['checked'] ? 'checked' : '';
				$checkboxes .= "<label class='map-toggles__layer-toggle'><input type='checkbox'  {$checked} data-id='{$id['id']}' />&nbsp;{$id['label']}</label>";
		}
		return $checkboxes;
	}
}
