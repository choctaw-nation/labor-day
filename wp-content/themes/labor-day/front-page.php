<?php
/**
 * Homepage Template
 *
 * @author KJ Roelke
 * @since  1.0
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
<main class="site-content">
	<section class='w-100 hero--image' style="background-image:url('<?php echo $background_image->src; ?>');" id='hero'>
		<div class="overlay"></div>
		<div class="container">
			<div class="row">
				<div class="col animate__animated animate__fadeInRight">
					<span class="headline animate__animated animate__fadeInUp animate__delay-1s d-block">August 30 &ndash; September 1, 2024</span>
					<div class="countdown" id='countdown'></div>
				</div>
			</div>
		</div>
	</section>
	<?php // get_template_part( 'template-parts/aside', 'subscribe' ); ?>
	<section id="about-the-festival">
		<div class=" container">
			<div class="row">
				<div class="col-lg-4 d-flex flex-column align-items-center" data-aos="fade-right">
					<figure class='great-seal'>
						<?php echo file_get_contents( 'wp-content/themes/labor-day/images/great-seal-2.svg' ); ?>
					</figure>
				</div>
				<div class="col-lg-8 d-flex flex-column justify-content-center align-items-center">
					<p><?php echo get_field( 'section_2' )['about']; ?></p>
				</div>
			</div>
		</div>
	</section>
	<?php
	get_template_part( 'template-parts/aside', 'text-callout', array( 'color' => 'secondary' ) );

	/**
	 * Hide Until 2024
	 */
	// get_template_part( 'template-parts/home/content', 'entertainment' );
	?>
	<section id="vendors" class='bg-primary'>
		<div class="container">
			<div class="row">
				<h2 class="headline text-white">
					Register Now
				</h2>
			</div>
		</div>
		<?php get_template_part( 'template-parts/home/slider', 'registrations' ); ?>
		<div class="container">
			<div class="row">
				<div class="col d-flex-column">
					<a href="/registrations" class="btn__fill--secondary align-self-center">See All Registrations</a>
				</div>
			</div>
		</div>
	</section>
	<section id="map">
		<div class="container">
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
		</div>
	</section>
	<section id="facebook">
		<div class="container">
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
		</div>
	</section>
</main>
<?php
get_footer();
