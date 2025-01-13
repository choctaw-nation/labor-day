<?php
/**
 * The Events Archive (Plugin Override)
 *
 * @package LaborDay
 * @subpackage Events
 */

$taxonomies = get_object_taxonomies( 'events', 'objects' );
cno_enqueue_page_assets( 'search' );
$show_operational_hours = get_field( 'show_operational_hours', 'options' );
wp_localize_script( 'search', 'operationalHours', array( 'showOperationalHours' => true === $show_operational_hours ? 'true' : 'false' ) );
get_header();
?>
<section class="hero container py-5">
	<div class="row">
		<div class="col">
			<h1>Schedule</h1>
			<span class="subheadline mb-5">
				<?php echo empty( get_field( 'hero', 28 )['subheadline'] ) ? acf_get_field( 'hero', 28 )['sub_fields'][0]['default_value'] : get_field( 'hero', 28 )['subheadline']; ?>
			</span>
			<a href="/my-schedule" class="btn btn-secondary mb-3 mb-lg-0">View Your Schedule</a>
			<?php
			if ( $show_operational_hours ) {
				echo '<button class="btn btn-outline-secondary" data-bs-toggle="modal" data-bs-target="#hoursModal"> View Services / Operations Hours </button>';
				get_template_part( 'template-parts/events/modal', 'operational-hours' );
			}
			?>
		</div>
	</div>
</section>
<?php
if ( ! is_plugin_active( 'search-filter-pro/search-filter-pro.php' ) ) {
	get_template_part( 'template-parts/events/content', 'react-app' );
} else {
	get_template_part( 'template-parts/events/form', 'search' );
	echo do_shortcode( '[searchandfilter query="1" action="show-results"]' );

}
get_footer();
