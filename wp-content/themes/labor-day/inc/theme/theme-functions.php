<?php
/**
 * The global helper functions to use
 *
 * @since 1.0
 * @package ChoctawNation
 */

/** Trim the Event Description.
 *
 * @param string $event_description the string to trim
 * @param bool   $echo echo/return toggle
 */
function cno_trim_event_description( string $event_description, bool $echo = true ) { // phpcs:ignore Universal.NamingConventions.NoReservedKeywordParameterNames.echoFound
	$string            = '';
	$closing_p_tag_pos = strpos( $event_description, '</p>' );
	if ( false !== $closing_p_tag_pos ) {
		$trimmed_string = substr( $event_description, 0, $closing_p_tag_pos + 4 );
		$string         = substr( $trimmed_string, 0, 240 ) . '...';
	} else {
		$string = $event_description;
	}
	if ( $echo ) {
		echo $string;
	} else {
		return $string;
	}
}

/**
 * Take the pretty day (Friday, Saturday, Sunday) and returns the date
 *
 * @param string $day Long, capitalized day
 * @return string Date as long month, single number (e.g. "September 1");
 */
function cno_get_the_date( string $day ): string {
	$labor_day_dates = get_field( 'labor_day_dates', 'options' );
	$date_map        = array(
		'Friday'   => $labor_day_dates['friday'],
		'Saturday' => $labor_day_dates['saturday'],
		'Sunday'   => $labor_day_dates['sunday'],
	);
	if ( array_key_exists( $day, $date_map ) ) {
		return $date_map[ $day ];
	} else {
		return '';
	}
}

/**
 * Enqueues the page style.
 *
 * @param string $id The id you set in webpack.config.js.
 * @param array  $deps Optional array of dependencies.
 */
function cno_enqueue_page_style( string $id, array $deps = array( 'global' ) ) {
	$asset_file = get_stylesheet_directory() . "/dist/pages/{$id}.asset.php";
	if ( file_exists( $asset_file ) ) {
		$asset      = require $asset_file;
		$total_deps = array_unique( array_merge( $deps, array( 'global' ) ) );
		wp_enqueue_style(
			$id,
			get_stylesheet_directory_uri() . "/dist/pages/{$id}.css",
			$total_deps,
			$asset['version'],
		);

	} else {
		wp_enqueue_style(
			$id,
			get_stylesheet_directory_uri() . "/dist/pages/{$id}.css",
			$deps,
			filemtime( get_stylesheet_directory() . "/dist/pages/{$id}.css" )
		);
	}
}

/**
 * Enqueues the page script.
 *
 * @param string $id The id you set in webpack.config.js.
 * @param array  $deps Optional array of dependencies.
 */
function cno_enqueue_page_script( string $id, array $deps = array( 'global' ) ) {
	$asset_file = get_stylesheet_directory() . "/dist/pages/{$id}.asset.php";

	if ( file_exists( $asset_file ) ) {
		$asset      = require $asset_file;
		$total_deps = array_unique( array_merge( $asset['dependencies'], $deps, array( 'global' ) ) );
		wp_enqueue_script(
			$id,
			get_stylesheet_directory_uri() . "/dist/pages/{$id}.js",
			$total_deps,
			$asset['version'],
			array( 'strategy' => 'defer' )
		);
	} else {
		wp_enqueue_script(
			$id,
			get_stylesheet_directory_uri() . "/dist/pages/{$id}.js",
			$deps,
			filemtime( get_stylesheet_directory() . "/dist/pages/{$id}.js" ),
			array( 'strategy' => 'defer' )
		);
	}
}

/**
 * Enqueues both the page style and script.
 *
 * @param string $id The id you set in webpack.config.js.
 * @param array  $deps Associative array of dependencies for styles and scripts.
 */
function cno_enqueue_page_assets( string $id, array $deps = array() ) {
	$default_deps = array(
		'styles'  => array( 'global' ),
		'scripts' => array( 'global' ),
	);

	$deps = wp_parse_args( $deps, $default_deps );

	cno_enqueue_page_style( $id, $deps['styles'] );
	cno_enqueue_page_script( $id, $deps['scripts'] );
}


// Add Classes to Gravity Forms Buttons
add_filter( 'gform_submit_button', 'add_custom_css_classes', 10, 2 );

/**
 * Add classes to Gravity form buttons
 *
 * @param string $button The button HTML
 */
function add_custom_css_classes( $button ): string {
	$dom = new DOMDocument();
	$dom->loadHTML( $button );
	$input   = $dom->getElementsByTagName( 'input' )->item( 0 );
	$classes = $input->getAttribute( 'class' );
	$classes = 'btn btn-secondary';
	$input->setAttribute( 'class', $classes );
	return $dom->saveHtml( $input );
}