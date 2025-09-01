<?php
/**
 * The Events Archive (Plugin Override)
 *
 * @package LaborDay
 * @subpackage Events
 */

$taxonomies = get_object_taxonomies( 'events', 'objects' );
wp_enqueue_script( 'add-to-schedule' );
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
			<div class="d-flex flex-wrap gap-3">
			<a href="/my-schedule" class="btn btn-secondary fs-6">View Your Schedule</a>
			<?php
			if ( $show_operational_hours ) {
				echo '<button class="btn btn-outline-secondary fs-6" data-bs-toggle="modal" data-bs-target="#hours-modal"> View Services / Operations Hours </button>';
				get_template_part( 'template-parts/events/modal', 'operational-hours' );
			}
			?>
			</div>
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
get_template_part( 'template-parts/events/modal', 'share-event' );
get_footer();
