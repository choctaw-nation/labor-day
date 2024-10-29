<?php
/** Map Builder
 *
 * @package ChoctawNation
 * @subpackage Map
 * @since 1.0
 */

namespace ChoctawNation\Map;

/** Generates the Map */
class Map extends Map_Constructor {
	/** Echoes the markup for the map */
	public function the_map() {
		echo $this->get_the_map();
	}

	/** Generates the markup for the map */
	public function get_the_map(): string {
		$markup  = "<img class='map__base' src='{$this->base}'/>";
		$markup .= $this->zones;
		$markup .= $this->get_the_buildings();
		$markup .= "<img class='map__base--buildings' src='{$this->misc_buildings}'/>";
		$markup .= $this->icons_areas_labels;
		return $markup;
	}

	/** Returns the buildings markup for the map */
	private function get_the_buildings(): string {
		$buildings = '';
		foreach ( $this->buildings as $building ) {
			$src        = $this->map_uri . "/buildings/{$building['name']}.webp";
			$id         = empty( $building['id'] ) ? $building['name'] : $building['id'];
			$buildings .= "<img src='{$src}' id='{$id}' class='map__base--buildings' alt='image of {$building['name']}'/>";
		}
		return $buildings;
	}

	/** Generates the building checkbox toggles */
	public function get_the_building_checkboxes(): string {
		return $this->create_checkboxes( $this->buildings );
	}

	/** Generates the key area checkbox toggles */
	public function get_the_area_checkboxes(): string {
		return $this->create_checkboxes( $this->area_ids );
	}

	/** Generates the labels checkbox toggles */
	public function get_the_label_checkboxes(): string {
		return $this->create_checkboxes( $this->label_ids );
	}

	/**
	 * Create labels out of an array of ids
	 *
	 * @param Map_Element|array $ids the ids to create checkboxes for.
	 */
	private function create_checkboxes( $ids ): string {
		$checkboxes = '';
		foreach ( $ids as $id ) {
			if ( $id instanceof Map_Element ) {
				$id = (array) $id;
			}
			if ( isset( $id['icon'] ) ) {
				$checkboxes .= '<div class="map-toggles__layer-toggle">';
				$checkboxes .= $this->get_the_checkbox( $id );
				$checkboxes .= $this->get_the_icon( $id['icon'] );
				$checkboxes .= '</div>';
			} else {
				$checkboxes .= $this->get_the_checkbox( $id );
			}
		}
		return $checkboxes;
	}

	/**
	 * Get the icon
	 *
	 * @param string $icon the icon to get
	 */
	private function get_the_icon( $icon ): string {
		$path = get_theme_file_path( "/images/map-{$this->map_version}/icons/{$icon}.svg" );
		return $this->get_svg( $icon, $path );
	}

	/**
	 * Get the checkbox
	 *
	 * @param array $element the element to get the checkbox for
	 */
	private function get_the_checkbox( $element ): string {
		$checked  = isset( $element['checked'] ) && true === $element['checked'] ? 'checked' : '';
		$input_id = empty( $element['id'] ) ? $element['name'] : $element['id'];
		return "<label class='map-toggles__layer-toggle'><input type='checkbox'  {$checked} data-id='{$input_id}' />&nbsp;{$element['label']}</label>";
	}
}