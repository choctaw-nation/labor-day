<?php

/**
 * The Events Archive (Plugin Override)
 */

get_header();
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
					<div class="cno-event-search-filters__filter">
						<input type="checkbox" name="filter" id="filter" />
						<label for="filter">A Filter</label>
					</div>
					<div class="cno-event-search-filters__filter">
						<input type="checkbox" name="filter" id="filter" />
						<label for="filter">A Filter</label>
					</div>
					<div class="cno-event-search-filters__filter">
						<input type="checkbox" name="filter" id="filter" />
						<label for="filter">A Filter</label>
					</div>
					<div class="cno-event-search-filters__filter">
						<input type="checkbox" name="filter" id="filter" />
						<label for="filter">A Filter</label>
					</div>
					<div class="cno-event-search-filters__filter">
						<input type="checkbox" name="filter" id="filter" />
						<label for="filter">A Filter</label>
					</div>
					<div class="cno-event-search-filters__filter">
						<input type="checkbox" name="filter" id="filter" />
						<label for="filter">A Filter</label>
					</div>
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