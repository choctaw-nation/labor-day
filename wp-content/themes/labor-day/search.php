<?php
/**
 * The template for displaying search results pages
 *
 * @link https://developer.wordpress.org/themes/basics/template-hierarchy/#search-result
 *
 * @package WordPress
 * @subpackage Twenty_Twenty_One
 * @since 1.0.0
 */

get_header();

if ( have_posts() ) :?>
<header class="page-header alignwide">
	<div class="container">
		<div class="row">
			<h1 class="page-title headline">
				<?php
				printf(
				/* translators: %s: search term. */
					esc_html__( 'Results for "%s"', 'twentytwentyone' ),
					'<span class="page-description search-term">' . esc_html( get_search_query() ) . '</span>'
				);
				?>
			</h1>
		</div>
		<div class="search-result-count row">
			<p>
				<?php
				printf(
					esc_html(
					/* translators: %d: the number of search results. */
						_n(
							'We found %d result for your search.',
							'We found %d results for your search.',
							(int) $wp_query->found_posts,
							'twentytwentyone'
						)
					),
					(int) $wp_query->found_posts
				);
				?>
			</p>

		</div><!-- .search-result-count -->
	</div>
</header><!-- .page-header -->

<div class=" container">
	<div class="row">
		<?php
		while ( have_posts() ) :
			the_post();
			?>
		<div class="col-lg-4">
			<a href="<?php the_permalink(); ?>">
				<figure><img src="<?php echo get_the_post_thumbnail_url(); ?>" class="w-100"></figure>
				<h2 class="headline h3"><?php echo get_the_title(); ?></h2>
				<span class="text-content"><?php echo get_the_excerpt(); ?></span>
				<p>Read More</p>
			</a>
		</div>
		<?php endwhile; // End the loop. ?>
	</div>
</div>

<?php else : ?>
<div class="container">
	<p>No posts found.</p>
</div>
	<?php
endif;

get_footer();