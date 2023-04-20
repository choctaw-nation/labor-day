<?php

/**
 * The Events Archive (Plugin Override)
 */

get_header();
$taxonomies = get_object_taxonomies('events', 'objects');


?>
<div class="cno-events-wrapper">
	<section class="hero">
		<div class="container">
			<h1>The Events</h1>
		</div>
	</section>
	<?php if (have_posts()) : ?>
	<section class="cno-event-search">
		<div class="container">
			<h2 class="cno-event-search__title">Search Events</h2>
			<input type=" text" name="search" id="search" placeholder="Find an Event" class="cno-event-search__search-bar" />
			<div class="cno-event-search__filters cno-event-search-filters">
				<h3 class="cno-event-search-filters__title">Filters</h3>
				<div class="cno-event-search-filters__container">
					<?php foreach ($taxonomies as $taxonomy) {
							echo "<h4 class='cno-event-search-filters__title'>{$taxonomy->label}</h4>";
							$terms_array;
							$terms_array[] = get_terms(array(
								'taxonomy' => $taxonomy->name,
								'hide_empty' => true,
							));
							foreach ($terms_array as $term) {
								foreach ($term as $t) {
									echo '<div class="cno-event-search-filters__filter">';
									echo "<input type='checkbox' name='{$t->slug}' id='{$t->slug}' />";
									// echo "<input type='checkbox' name='{$t["slug"]}' id='{$t["slug"]}' />";
									echo "<label for='{$t->slug}'>{$t->name}</label>";
								}
							};
						}; ?>
				</div>
			</div>
		</div>
	</section>
	<div class="container">
		<section class="cno-events">
			<?php while (have_posts()) : the_post(); ?>
			<?php get_template_part('template-parts/content', 'event-display'); ?>
			<?php endwhile; ?>
		</section>
	</div>
	<?php else : ?>
	<section class="cno-events">No events found.</section>
	<?php endif; ?>
</div>
</div>

<?php get_footer();