<?php
/**
 * Generic Page Template
 *
 * @package ChoctawNation
 */

get_header();
$page_class = strtolower( $post->post_title );
echo "<main class='site-content {$page_class}'>";
get_template_part( 'template-parts/content', 'hero' );

$templates = array(
	'registration'         => 'registrations',
	'map'                  => 'map',
	'history'              => 'history',
	'contact'              => 'contact',
	'my-schedule'          => 'my-schedule',
	'festival-information' => 'festival-information',
	'volunteers'           => 'volunteers',
);

if ( key_exists( $post->post_name, $templates ) ) {
	get_template_part( 'template-parts/page', $templates[ $post->post_name ] );
} else {
	echo "<div class='mt-5'>" . get_the_content() . '</div>';
}

echo '</main>';
get_footer();
