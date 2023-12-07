<?php
/**
 * Homepage Template
 *
 * @author KJ Roelke
 * @since  1.0
 */

use ChoctawNation\ACF\Image;
$content = new Content_Sections();
cno_enqueue_page_assets( 'frontPage' );
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
				<div class="col-lg-4" data-aos="fade-right">
					<figure class='great-seal'>
						<?php echo file_get_contents( 'wp-content/themes/labor-day/images/great-seal-2.svg' ); ?>
					</figure>
				</div>
				<div class="col-lg-8">
					<p><?php echo get_field( 'section_2' )['about']; ?></p>
				</div>
			</div>
		</div>
	</section>
	<?php get_template_part( 'template-parts/aside', 'text-callout', array( 'color' => 'secondary' ) ); ?>
	<!-- Hide Until 2024 -->
	<!-- <section id="entertainment">
		<div class="container">
			<div class="row">
				<h2 class="featured-event__headline">Special Entertainment</h2>
			</div>
			<div class="row">
				<h3 class="featured-event__headline--day-label">Saturday</h3>
			</div>
			<div class="row">
				<h3 class="featured-event__headline--day-label">Sunday</h3>
			</div>
			<div class="row">
				<div class="col d-flex-column align-items-center">
					<a href="/events" class="btn__fill--primary">See Full Schedule</a>
				</div>
			</div>
		</div>
	</section>
	<section id="vendors" class='bg-color-primary'>
		<div class="container">
			<div class="row">
				<h2 class="headline text-white">
					Register Now
				</h2>
			</div>
		</div>
		<?php // get_template_part( 'template-parts/slider', 'registrations' ); ?>
		<div class="container">
			<div class="row">
				<div class="col d-flex-column">
					<a href="/registrations" class="btn__fill--secondary align-self-center">See All Registrations</a>
				</div>
			</div>
		</div>
	</section> -->
	<section id="map">
		<div class="container">
			<?php
			$map_fields = get_field( 'map' );
			$args       = array(
				'headline' => 'Map',
				'content'  => $map_fields['subheadline'],
				'cta_text' => 'View Map',
				'cta_link' => '/map',
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
				'headline'     => 'Labor Day Festival on Facebook',
				'content'      => $subheadline,
				'cta_text'     => 'Follow On Facebook',
				'cta_external' => true,
				'cta_link'     => 'https://chocta.ws/fb-labor-day',
				'reverse'      => true,
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