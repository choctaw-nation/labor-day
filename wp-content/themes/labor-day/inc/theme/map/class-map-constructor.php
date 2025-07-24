<?php
/**
 * Map Constructor
 *
 * @package ChoctawNation
 * @subpackage Map
 * @since 3.3.2
 */

namespace ChoctawNation\Map;

/**
 * Map Constructor
 */
abstract class Map_Constructor {
	/** Map base (png)
	 *
	 * @var string $base
	 */
	protected string $base;

	/** Map Zones (svg)
	 *
	 * @var string $zones
	 */
	protected string $zones;

	/** Map buildings (png)
	 *
	 * @var array $buildings
	 */
	protected array $buildings;

	/** Area IDs
	 *
	 * @var array $area_ids
	 */
	protected array $area_ids;

	/** Label IDs
	 *
	 * @var array $label_ids
	 */
	protected array $label_ids;

	/** Misc unlabeled Buildings (svg)
	 *
	 * @var string $misc_buildings
	 */
	protected string $misc_buildings;

	/** The Icons (svg)
	 *
	 * @var string $icons_areas_labels
	 */
	protected string $icons_areas_labels;

	/**
	 * Map Version
	 *
	 * @var string $map_version
	 */
	protected string $map_version;

	/**
	 * Map File Path
	 *
	 * @var string $map_uri;
	 */
	protected string $map_uri;

	/** Constructor */
	public function __construct() {
		$this->map_version = 'v5';
		$this->map_uri     = get_template_directory_uri() . "/images/map-{$this->map_version}";
		$this->get_map_files();
	}

	/** Gets Map Assets from folders and assigns them to the class */
	private function get_map_files() {
		$this->base = $this->map_uri . '/base.webp';
		$this->set_the_zones();
		$this->set_the_buildings();
		$this->set_the_area_ids();
		$this->set_the_label_ids();
		$this->misc_buildings = $this->map_uri . '/misc-buildings.webp';
		$this->set_the_icons_areas_labels();
	}

	/** Get the svg
	 *
	 * @param string      $file_path the svg path
	 * @param string|null $path [Optional] the path to the file
	 */
	protected function get_svg( $file_path, string|null $path = null ): string {
		if ( ! $path ) {
			$path = get_theme_file_path( "/images/map-{$this->map_version}/svgs/{$file_path}.svg" );
		}
		require_once ABSPATH . 'wp-admin/includes/file.php';
		\WP_Filesystem();
		global $wp_filesystem;
		return $wp_filesystem->get_contents( $path );
	}

	/** Sets the `$zones` property */
	private function set_the_zones() {
		$this->zones = $this->get_svg( 'zones' );
	}

	/** Sets the `$buildings` property */
	private function set_the_buildings() {
		$buildings = array(
			array(
				'name'    => '5k',
				'label'   => '5k Start / Finish',
				'checked' => true,
			),
			array(
				'name'    => 'ampitheater',
				'label'   => 'Amphitheater',
				'checked' => true,
			),
			array(
				'name'    => 'arts-and-crafts',
				'label'   => 'Arts & Crafts',
				'checked' => true,
			),
			array(
				'name'    => 'cafeteria',
				'label'   => 'Cafeteria',
				'checked' => true,
			),
			array(
				'name'    => 'capitol-museum',
				'label'   => 'Capitol Museum',
				'checked' => true,
			),
			array(
				'name'    => 'chapel',
				'label'   => 'Chapel',
				'checked' => true,
			),
			array(
				'name'    => 'choctaw-village',
				'label'   => 'Choctaw Village',
				'checked' => true,
			),
			array(
				'name'    => 'council-building',
				'label'   => 'Council Building',
				'checked' => true,
			),
			array(
				'name'    => 'greenhouse',
				'label'   => 'Greenhouse',
				'checked' => true,
			),
			array(
				'name'    => 'ice-house',
				'label'   => 'Ice House',
				'checked' => true,
			),
			array(
				'name'    => 'lost-child',
				'label'   => 'Lost Child',
				'checked' => true,
			),
			array(
				'name'    => 'playground',
				'label'   => 'Playground',
				'checked' => true,
			),
			array(
				'name'    => 'red-warrior-ball-field',
				'id'      => 'red-warrior-ball-park',
				'label'   => 'Red Warrior Ball Park',
				'checked' => true,
			),
			array(
				'name'    => 'red-warrior-park',
				'label'   => 'Red Warrior Park',
				'checked' => true,
			),
			array(
				'name'    => 'snow-cone-stand',
				'label'   => 'Snow Cone Stand',
				'checked' => true,
			),
			array(
				'name'    => 'stickball-field',
				'label'   => 'Stickball Field',
				'checked' => true,
			),
			array(
				'name'    => 'veteran-cemetery',
				'label'   => 'Veteran Cemetery',
				'checked' => true,
			),
		);
		usort( $buildings, array( $this, 'alphabetize_callback' ) );
		$this->buildings = $buildings;
	}

	/** Sets the `$icons_areas_labels` property */
	private function set_the_icons_areas_labels() {
		$this->icons_areas_labels = $this->get_svg( 'icons-areas-labels' );
	}

	/** Sets the area ids */
	private function set_the_area_ids() {
		$area_ids = array(
			new Map_Element(
				array(
					'id'    => 'Accessible_Parking',
					'label' => 'Accessible Parking',
					'icon'  => 'accessible-parking',
				)
			),
			new Map_Element(
				array(
					'id'    => 'Associate_Parking',
					'label' => 'Associate Parking',
				)
			),
			new Map_Element(
				array(
					'id'    => 'ATM',
					'label' => 'ATMs',
					'icon'  => 'atm',
				)
			),
			new Map_Element(
				array(
					'id'    => 'Chahta_Cab',
					'label' => 'Chahta Cab',
					'icon'  => 'chahta-cab',
				)
			),
			new Map_Element(
				array(
					'id'    => 'Choctaw_Store',
					'label' => 'Choctaw Store',
					'icon'  => 'choctaw-store',
				)
			),
			new Map_Element(
				array(
					'id'    => 'Education_Tent',
					'label' => 'Education Tent',
					'icon'  => 'education-tent',
				),
			),
			new Map_Element(
				array(
					'id'    => 'Elder_Ride',
					'label' => 'Elder Ride',
					'icon'  => 'elder-ride',
				),
			),
			new Map_Element(
				array(
					'id'    => 'First_Aid',
					'label' => 'First Aid',
					'icon'  => 'first-aid',
				)
			),
			new Map_Element(
				array(
					'id'    => 'Food',
					'label' => 'Food',
					'icon'  => 'food',
				)
			),
			new Map_Element(
				array(
					'id'    => 'Going_Green_Tents',
					'label' => 'Going Green Tent',
					'icon'  => 'going-green-tent',
				)
			),
			new Map_Element(
				array(
					'id'    => 'Healthy_Living_Expo',
					'label' => 'Healthy Living Expo',
					'icon'  => 'healthy-living-expo',
				)
			),
			new Map_Element(
				array(
					'id'    => 'Information',
					'label' => 'Information',
					'icon'  => 'information',
				)
			),
			new Map_Element(
				array(
					'id'    => 'Lost_Child',
					'label' => 'Lost Child (Wristband Station)',
					'icon'  => 'lost-child-station',
				)
			),
			new Map_Element(
				array(
					'id'    => 'Membership',
					'label' => 'Membership',
					'icon'  => 'membership',
				)
			),
			new Map_Element(
				array(
					'id'    => 'Mothers_Room',
					'label' => 'Mother\'s Room',
					'icon'  => 'mothers-room',
				)
			),
			new Map_Element(
				array(
					'id'    => 'Parking',
					'label' => 'Parking',
					'icon'  => 'parking',
				)
			),
			new Map_Element(
				array(
					'id'    => 'Parking_Station',
					'label' => 'Parking Stations',
					'icon'  => 'parking-stations',
				)
			),
			new Map_Element(
				array(
					'id'    => 'Restrooms',
					'label' => 'Restrooms',
					'icon'  => 'restroom',
				)
			),
			new Map_Element(
				array(
					'id'    => 'RV_Parking',
					'label' => 'RV Parking',
					'icon'  => 'rv-parking',
				)
			),
			new Map_Element(
				array(
					'id'    => 'Shower',
					'label' => 'Showers',
					'icon'  => 'shower',
				)
			),
			new Map_Element(
				array(
					'id'    => 'Tent_Camping',
					'label' => 'Tent Camping',
					'icon'  => 'tent-camping',
				)
			),

			new Map_Element(
				array(
					'id'    => 'Tent_and_RV_Check_In',
					'label' => 'Tent & RV Check-In',
					'icon'  => 'rv-tent-check-in',
				)
			),
			new Map_Element(
				array(
					'id'    => 'Tram_Stop',
					'label' => 'Tram Stops',
					'icon'  => 'tram-stop',
				)
			),
			new Map_Element(
				array(
					'id'    => 'Tribal_Police',
					'label' => 'Tribal Police',
					'icon'  => 'tribal-police',
				)
			),
			new Map_Element(
				array(
					'id'    => 'Water_Station',
					'label' => 'Water Stations',
					'icon'  => 'water-station',
				)
			),

		);
		usort( $area_ids, array( $this, 'alphabetize_callback' ) );
		$this->area_ids = $area_ids;
	}

	/** Sets the label ids */
	private function set_the_label_ids() {
		$label_ids = array(
			new Map_Element(
				array(
					'id'    => 'Street_Labels',
					'label' => 'Street Names',
				)
			),
			new Map_Element(
				array(
					'id'    => 'Zone_1',
					'label' => 'Zone 1',
				)
			),
			new Map_Element(
				array(
					'id'    => 'Zone_2',
					'label' => 'Zone 2',
				)
			),
			new Map_Element(
				array(
					'id'    => 'Zone_3',
					'label' => 'Zone 3',
				)
			),
			new Map_Element(
				array(
					'id'    => 'Zone_4',
					'label' => 'Zone 4',
				)
			),
			new Map_Element(
				array(
					'id'    => 'Zone_5',
					'label' => 'Zone 5',
				)
			),
			new Map_Element(
				array(
					'id'    => 'Zone_6',
					'label' => 'Zone 6',
				)
			),
			new Map_Element(
				array(
					'id'    => 'Zone_7',
					'label' => 'Zone 7',
				)
			),
		);
		usort( $label_ids, array( $this, 'alphabetize_callback' ) );
		$this->label_ids = $label_ids;
	}

	/**
	 * Sort the map elements alphabetically by label
	 *
	 * @param mixed $a the first element
	 * @param mixed $b the second element
	 * @return int
	 */
	private function alphabetize_callback( $a, $b ) {
		if ( is_array( $a ) && is_array( $b ) ) {
			return strcmp( $a['label'], $b['label'] );
		} elseif ( $a instanceof Map_Element && $b instanceof Map_Element ) {
			return strcmp( $a->label, $b->label );
		} else {
			return 0;
		}
	}
}
