<?php
/**
 * Template Name: Simple Page (Blank, Container)
 * Handles the output of Simple Pages
 *
 * @package ChoctawNation
 */

use ChoctawNation\Content\Sections;

$content = new Sections();
get_header();
$background_image_url = get_field( 'hero' )['background_image'];
$hero_section_class   = 'w-100' . ( $background_image_url ? ' hero--image' : ' text-bg-tertiary py-4' );
?>
<main class="site-content <?php echo strtolower( $post->post_title ); ?>">
	<section class="<?php echo $hero_section_class; ?>" id="hero" <?php echo $background_image_url ? "style='background-image:url('{$background_image_url}')" : ''; ?>>
		<div class="container text-center">
			<?php the_title( "<h1 class='headline'>", '</h1>' ); ?>
			<span class="subheadline mb-5">
				<?php echo empty( get_field( 'hero' )['subheadline'] ) ? acf_get_field( 'hero' )['sub_fields'][0]['default_value'] : get_field( 'hero' )['subheadline']; ?>
			</span>
		</div>
	</section>
	<article class="container my-5">
		<?php the_field( 'acf_the_content' ); ?>
	</article>
</main>
<?php
get_footer();