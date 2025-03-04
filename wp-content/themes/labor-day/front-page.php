<?php
/**
 * Homepage Template
 *
 * @author KJ Roelke
 * @since  1.0
 * @package ChoctawNation
 */

use ChoctawNation\ACF\Image;
use ChoctawNation\Asset_Loader;
use ChoctawNation\Content\Sections;
use ChoctawNation\Enqueue_Type;

$content = new Sections();
new Asset_Loader( 'frontPage', Enqueue_Type::both, 'pages', array( 'styles' => array( 'global' ) ) );
get_header();
$background_image = new Image( get_field( 'hero' )['background_image'] );
?>
<h1 class="visually-hidden">
	<?php echo bloginfo( 'name' ); ?>
</h1>
<main class="site-content">
	<section class="position-relative hero d-flex flex-column justify-content-center py-5" id="hero">
		<?php $background_image->the_image( 'z-n1 position-absolute top-0 w-100 h-100 object-fit-cover start-50 translate-middle-x', false, true ); ?>
		<div class="bg-dark bg-opacity-50 position-absolute top-0 w-100 h-100 z-1"></div>
		<div class="container position-relative z-2">
			<div class="row">
				<div class="col animate__animated animate__fadeInRight">
					<span class="display-2 fw-normal lh-base text-white text-center animate__animated animate__fadeInUp animate__delay-1s d-block">August 29 &ndash; August 31, 2025</span>
					<div class="countdown w-100 text-white text-center" id="countdown"></div>
				</div>
			</div>
		</div>
	</section>
	<section class="my-5 container" id="about-the-festival">
		<div class="row row-gap-4">
			<div class="col-lg-4 d-flex flex-column align-items-center" data-aos="fade-right">
				<figure class='great-seal ratio ratio-1x1'>
					<img src="<?php echo get_template_directory_uri() . '/images/great-seal-2.svg'; ?>" alt="The Great Seal of the Choctaw Nation" loading='lazy'>
				</figure>
			</div>
			<div class="col-lg-8 d-flex flex-column justify-content-center align-items-center">
				<p class='fs-6 mb-0'><?php echo get_field( 'section_2' )['about']; ?></p>
			</div>
		</div>
	</section>
	<?php
	get_template_part( 'template-parts/aside', 'text-callout', array( 'color' => 'secondary' ) );
	get_template_part( 'template-parts/home/section', 'entertainment' );
	if ( get_field( 'show_registrations' ) ) {
		get_template_part( 'template-parts/home/section', 'registrations' );
	}
	?>
	<section id="map" class="container my-5">
		<?php
			$map_fields = get_field( 'map' );
			$args       = array(
				'headline'       => 'Map',
				'headline_class' => 'h1 text-uppercase',
				'content'        => $map_fields['subheadline'],
				'cta_text'       => 'View Map',
				'cta_link'       => '/map',
			);

			if ( isset( $map_fields['image'] ) ) {
				$args['image'] = $map_fields['image'];
			}
			$content->two_col_text_and_media( $args );
			?>
	</section>
	<section class="container" id="facebook">
		<?php
			$fb_fields = get_field( 'facebook' );
			extract( $fb_fields );
			$args = array(
				'headline'       => 'Labor Day Festival on Facebook',
				'headline_class' => 'h1 text-uppercase',
				'content'        => $subheadline,
				'cta_text'       => 'Follow On Facebook',
				'cta_external'   => true,
				'cta_link'       => 'https://chocta.ws/fb-labor-day',
				'reverse'        => true,
			);
			if ( isset( $image ) ) {
				$args['image'] = $image;
			}
			$content->two_col_text_and_media( $args );
			?>
	</section>
</main>
<?php
get_footer();
