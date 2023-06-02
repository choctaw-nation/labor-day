<?php
/**
 * The template for displaying 404 pages (not found)
 *
 * @link https://codex.wordpress.org/Creating_an_Error_404_Page
 *
 * @package ChoctawNation
 */

get_header();
?>
<div id="content" class="site-content container py-5 mt-5">
	<div id="primary" class="content-area">
		<main id="main" class="site-main">
			<section class="error-404 not-found">
				<h1 class="headline mb-3">404</h1>
				<p class="subheadline mb-4">Page not found.</p>
				<p>It looks like nothing was found at this location. Try searching for what you were looking for:</p>
				<form role="search" method="get" action="<?php echo home_url(); ?>" style="font-size:1.35em">
					<label for="s">Search For: </label>
					<input type="text" name="s" id="s" />
					<input type="submit" value="Search" id="searchsubmit" class="btn__fill--secondary" style="padding:8px 1rem;font-size:1.6rem" />
				</form>
			</section><!-- .error-404 -->

		</main><!-- #main -->

	</div><!-- #primary -->
</div><!-- #content -->

<?php
get_footer();