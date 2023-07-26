<?php
/**
 * The helper functions to use
 *
 * @since 1.0
 */

/** Trim the Event Description.
 *
 * @param string $event_description the string to trim
 * @param bool   $echo echo/return toggle
 */
function cno_trim_event_description( string $event_description, bool $echo = true ) {
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

add_action( 'acf/init', 'cno_acf_options_page' );
/** Add Options Page */
function cno_acf_options_page() {
	if ( function_exists( 'acf_add_options_page' ) ) {
		acf_add_options_page(
			array(
				'page_title' => __( 'Theme General Settings' ),
				'menu_title' => __( 'Theme Settings' ),
				'menu_slug'  => 'theme-general-settings',
				'capability' => 'edit_posts',
				'redirect'   => false,
			)
		);
		acf_add_options_sub_page(
			array(
				'page_title'  => 'Hours of Operations',
				'menu_title'  => 'Operational Hours',
				'parent_slug' => 'theme-general-settings',
			)
		);

		acf_add_options_sub_page(
			array(
				'page_title'  => 'Theme Footer Settings',
				'menu_title'  => 'Footer Settings',
				'parent_slug' => 'theme-general-settings',
			)
		);
	}
}

/**
 * Take the pretty day (Friday, Saturday, Sunday) and returns the date
 *
 * @param string $day Long, capitalized day
 * @return string Date as long month, single number (e.g. "September 1");
 */
function cno_get_the_date( string $day ): string {
	if ( 'Friday' === $day ) {
		$date = 'September 1';
	} elseif ( 'Saturday' === $day ) {
		$date = 'September 2';
	} else {
		$date = 'September 3';
	}
	return $date;
}

/**
 * Enqueues the page style.
 *
 * @param string $id The id you set in webpack.config.js.
 * @param array  $deps Optional array of dependencies.
 */
function cno_enqueue_page_style( string $id, array $deps = array( 'main' ) ) {
	if ( file_exists( get_stylesheet_directory() . "/dist/{$id}.css" ) ) {
		wp_enqueue_style(
			$id,
			get_stylesheet_directory_uri() . "/dist/{$id}.css",
			$deps,
			filemtime( get_stylesheet_directory() . "/dist/{$id}.css" )
		);
	}
}

/**
 * Enqueues the page script.
 *
 * @param string $id The id you set in webpack.config.js.
 * @param array  $deps Optional array of dependencies.
 */
function cno_enqueue_page_script( string $id, array $deps = array( 'main' ) ) {
	$asset_file = get_stylesheet_directory() . "/dist/{$id}.asset.php";

	if ( file_exists( $asset_file ) ) {
		$asset      = require $asset_file;
		$total_deps = array_merge( $asset['dependencies'], $deps, array( 'main' ) );
		wp_enqueue_script(
			$id,
			get_stylesheet_directory_uri() . "/dist/{$id}.js",
			$total_deps,
			$asset['version'],
			true
		);
	} else {
		wp_enqueue_script(
			$id,
			get_stylesheet_directory_uri() . "/dist/{$id}.js",
			$deps,
			filemtime( get_stylesheet_directory() . "/dist/{$id}.js" ),
			in_footer: true
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
		'styles'  => array( 'main' ),
		'scripts' => array( 'main' ),
	);

	$deps = wp_parse_args( $deps, $default_deps );

	cno_enqueue_page_style( $id, $deps['styles'] );
	cno_enqueue_page_script( $id, $deps['scripts'] );
}