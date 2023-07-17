<?php
/**
 * Template Name: Simple Page (Blank, Container)
 * Handles the output of Simple Pages
 *
 * @package ChoctawNation
 */

$content = new Content_Sections();
get_header();
?>
<main class="site-content <?php echo strtolower( $post->post_title ); ?>">
	<?php $background_image_url = get_field( 'hero' )['background_image']; ?>
	<?php if ( $background_image_url ) : ?>
	<section class='w-100 hero--image' id='hero' style="background-image:url('<?php echo esc_url( $background_image_url ); ?>')"></section>
	<div class="container my-5 py-5">
		<?php the_title( "<h1 class='headline'>", '</h1>' ); ?>
		<span class="subheadline mb-5">
			<?php echo empty( get_field( 'hero' )['subheadline'] ) ? acf_get_field( 'hero' )['sub_fields'][0]['default_value'] : get_field( 'hero' )['subheadline']; ?>
		</span>
	</div>
	<?php else : ?>
	<section class='w-100 hero--color' id='hero' style='background-color:var(--color-tertiary);'>
		<div class="container text-center">
			<?php the_title( "<h1 class='headline'>", '</h1>' ); ?>
			<span class="subheadline mb-5">
				<?php echo empty( get_field( 'hero' )['subheadline'] ) ? acf_get_field( 'hero' )['sub_fields'][0]['default_value'] : get_field( 'hero' )['subheadline']; ?>
			</span>
		</div>
	</section>
	<?php endif; ?>
	<article class="container my-5">
		<?php echo acf_esc_html( get_field( 'acf_the_content' ) ); ?>
	</article>
</main>
<?php
get_footer();