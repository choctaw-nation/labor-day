<?php
/**
 * The React Version of Event Search
 *
 * @package ChoctawNation
 */

cno_enqueue_page_assets( 'search' );
?>
<div class="cno-events-wrapper" id="app">
	<?php if ( have_posts() ) : ?>
	<section class="cno-event-search">
		<div class="container">
			<h2 class="cno-event-search__title">Search Events</h2>
			<input type=" text" name="search" id="search" placeholder="Find an Event" class="cno-event-search__search-bar" />
			<div class="cno-event-search__filters">
				<div class="cno-event-search__filters--header">
					<h3 class="cno-event-search__filters--title">Filters</h3>
					<button class="btn__outline--secondary" id="toggle-filters">Show Filters</button>
				</div>
				<div class="cno-event-search-filters hide">
					<?php
					foreach ( $taxonomies as $cno_taxonomy ) {
						echo '<div class="cno-event-search-filters__container">';
						echo "<h4 class='cno-event-search-filters__title'{$cno_taxonomy->label}</h4>";
						$terms_array   = array();
						$terms_array[] = get_terms(
							array(
								'taxonomy'   => $cno_taxonomy->name,
								'hide_empty' => true,
							)
						);
						foreach ( $terms_array as $cno_term ) {
							foreach ( $cno_term as $t ) {
								echo '<div class="cno-event-search-filters__filter">';
								echo "<input type='checkbox' name='{$t->slug}' id='{$t->slug}' />";
								echo "<label for='{$t->slug}'>{$t->name}</label>";
								echo '</div>';
							}
						}
						echo '</div>';
					}
					?>
				</div>
			</div>
		</div>
	</section>
	<div class="container">
		<section class="cno-events" id="results">
			<?php
			while ( have_posts() ) {
				the_post();
				get_template_part( 'template-parts/events/content', 'event-display' );
			}
			?>
		</section>
	</div>
	<?php else : ?>
	<section class="cno-events">No events found.</section>
	<?php endif; ?>
</div>