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
switch ( $post->post_name ) {
	case 'registrations':
		get_template_part( 'template-parts/page', 'registrations' );
		break;
	case 'map':
		get_template_part( 'template-parts/page', 'map' );
		break;
	case 'history':
		get_template_part( 'template-parts/page', 'history' );
		break;
	case 'contact':
		get_template_part( 'template-parts/page', 'contact' );
		break;
	case 'my-schedule':
		get_template_part( 'template-parts/page', 'my-schedule' );
		break;
	case 'festival-information':
		get_template_part( 'template-parts/page', 'festival-information' );
		break;
	case 'volunteers':
		get_template_part( 'template-parts/page', 'volunteers' );
		break;
	default:
		echo "<div class='mt-5'>" . get_the_content() . '</div>';
}
echo '</main>';
get_footer();
