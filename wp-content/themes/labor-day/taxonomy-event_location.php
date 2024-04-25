<?php // phpcs:ignore
/**
 * Event Location Display
 *
 * @package ChoctawNation
 * @subpackage Events
 */

get_header();
?>
<main class="site-content">
	<section class='w-100 hero--color bg-tertiary py-5' id='hero'>
		<div class="container text-center">
			<span class="h3 text-grey">Event Location:</span>
			<h1 class="headline">
				<?php
				$first_term = get_the_terms( $post->ID, $taxonomy )[0];
				echo $first_term->name;
				?>
			</h1>
		</div>
	</section>
	<section class="my-5 container">
		<div class="row">
			<?php
				$map_snippets = array(
					'ampitheater'                => 'Amphitheater',
					'capitol-lawn'               => 'Capitol Lawn',
					'capitol-museum'             => 'Capitol Museum',
					'carnival'                   => 'Carnival',
					'chapel'                     => 'Chapel',
					'choctaw-village'            => 'Choctaw Village',
					'corner-of-nashoba-and-council-house-road' => 'Corner of Nashoba and Council House Road',
					'education-tent'             => 'Education Tent',
					'greenhouse'                 => 'Greenhouse',
					'healthy-living-tent'        => 'Healthy Living Tent',
					'red-warrior-park'           => 'Red Warrior Park',
					'softball-fields'            => 'Softball Fields',
					'stickball-field'            => 'Stickball Field',
					'tribal-membership-building' => 'Tribal Membership Building',
				);
				if ( ! array_key_exists( $term, $map_snippets ) ) {
					echo "<div class='mt-5'>" . get_the_content() . '</div>';
				} else {
					if ( 'playground' === $term ) {
						$term = 'playground-v2';
					}
					$src = get_stylesheet_directory_uri() . '/images/map-locations/' . $term . '.webp';
					if ( $src ) {
						echo "<img class='map-snippet col-12 col-lg-8' src='{$src}' alt='A snippet of the festival grounds map showing the location of the {$map_snippets[$term]}' />";
					}
				}
				?>
			<div class="col-12 col-lg-4 d-flex flex-column justify-content-center">
				<p class="fs-6">This screenshot is taken from the interactive map.</p>
				<div class="row my-4">
					<div class="col d-flex gap-4 row-cols-auto">
						<a href="/map" class="btn btn-secondary fs-6">View Interactive Map</a>
						<a href="/events" class="btn btn-outline-secondary fs-6">View All Events</a>
					</div>
				</div>
			</div>
		</div>

	</section>
</main>
<?php
get_footer();