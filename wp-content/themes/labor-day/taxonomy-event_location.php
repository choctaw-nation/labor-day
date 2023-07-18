<?php //phpcs:ignore
/** Event Location Display */

/** Gets the map image
 *
 * @param string $term the term name
 * @param string $location_name the location name for alt text
 */
function get_the_map_snippet( $term, $location_name ) {
	$src = get_stylesheet_directory_uri() . '/images/map-locations/' . $term . '.webp';
	if ( $src ) {
		echo "<img class='map-snippet col-12 col-lg-8' src='{$src}' alt='A snippet of the festival grounds map showing the location of the {$location_name}' />";
	}
}

get_header();
?>
<main class="site-content">
	<section class='w-100 hero--color' id='hero' style='background-color:var(--color-tertiary);'>
		<div class="container text-center">
			<span class="h3" style='color:var(--color-grey)'>Event Location:</span>
			<h1 class="headline">
				<?php $first_term = get_the_terms( $post->ID, $taxonomy )[0]; ?>
				<?php echo $first_term->name; ?>
			</h1>
			<a href="/map" class="btn__fill--secondary">View Interactive Map</a>
		</div>
	</section>
	<section>
		<div class="container">
			<div class="row">
				<?php
				switch ( $term ) {
					case 'ampitheatre':
						get_the_map_snippet( $term, 'Ampitheatre' );
						break;
					case 'capitol-lawn':
						get_the_map_snippet( $term, 'Capitol Lawn' );
						break;
					case 'capitol-museum':
						get_the_map_snippet( 'capitol-lawn', 'Capitol museum' );
						break;
					case 'carnival':
						get_the_map_snippet( $term, 'Carnival' );
						break;
					case 'chapel':
						get_the_map_snippet( $term, 'Chapel' );
						break;
					case 'choctaw-village':
						get_the_map_snippet( $term, 'Choctaw Village' );
						break;
					case 'corner-of-nashoba-and-council-house-road':
						get_the_map_snippet( $term, 'Corner of Nashoba and Council House Road' );
						break;
					case 'education-tent':
						get_the_map_snippet( $term, 'Education Tent' );
						break;
					case 'greenhouse':
						get_the_map_snippet( $term, 'Greenhouse' );
						break;
					case 'healthy-living-tent':
						get_the_map_snippet( $term, 'Healthy Living Tent' );
						break;
					case 'playground':
						get_the_map_snippet( $term, 'Playground' );
						break;
					case 'red-warrior-park':
						get_the_map_snippet( $term, 'Red Warrior Park' );
						break;
					case 'softball-fields':
						get_the_map_snippet( $term, 'Softball Fields' );
						break;
					case 'stickball-field':
						get_the_map_snippet( $term, 'Stickball Field' );
						break;
					case 'tribal-membership-building':
						get_the_map_snippet( $term, 'Tribal Membership Building' );
						break;
					default:
						echo "<div class='mt-5'>" . get_the_content() . '</div>';
				}
				?>
				<div class="col-12 col-lg-4 d-flex flex-column justify-content-center">
					<p>This screenshot is taken from the interactive map. <a href="/map">Click here to view the full map.</a></p>
					<a href="/events" class="btn__fill--primary align-self-start mt-5">View All Events</a>
				</div>
			</div>
		</div>
	</section>
</main>
<?php
get_footer();