<?php
/**
 * Generic Page Template
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
	<?php
	switch ( $post->post_name ) {
		case 'registrations':
			get_template_part( 'template-parts/page', 'registrations' );
			break;
		case 'map':
			get_template_part( 'template-parts/page', 'map' );
			break;
		case 'history':
			get_template_part( 'template-parts/page', 'history' );
			break;
		case 'contact':
			get_template_part( 'template-parts/page', 'contact' );
			break;
		case 'my-schedule':
			get_template_part( 'template-parts/page', 'my-schedule' );
			break;
		case 'festival-information':
			get_template_part( 'template-parts/page', 'festival-information' );
			break;
		case 'volunteers':
			get_template_part( 'template-parts/page', 'volunteers' );
			break;
		default:
			echo "<div class='mt-5'>" . get_the_content() . '</div>';

	}
	?>

</main>
<?php
get_footer();