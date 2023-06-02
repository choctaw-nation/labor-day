<?php
/**
 * Homepage Template
 *
 * @author KJ Roelke
 * @since  1.0
 */

$content = new Content_Sections();
cno_enqueue_page_assets( 'frontPage' );
get_header(); ?>
<main class="site-content">
	<?php $background_image_url = get_field( 'hero' )['background_image']; ?>
	<section class='w-100 hero--image' style="background-image:url('<?php echo esc_url( $background_image_url ); ?>');" id='hero'>
		<div class="overlay"></div>
		<div class="container">
			<div class="row">
				<div class="col animate__animated animate__fadeInRight">
					<span class="headline animate__animated animate__fadeInUp animate__delay-1s d-block">September 1 &ndash; 3, 2023</span>
					<div class="countdown" id='countdown'></div>
				</div>
			</div>
		</div>
	</section>
	<?php get_template_part( 'template-parts/aside', 'subscribe' ); ?>
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
	<section id="entertainment">
		<div class="container">
			<div class="row">
				<h2 class="featured-event__headline">Special Entertainment</h2>
			</div>
			<div class="row">
				<h3 class="featured-event__headline--day-label">Saturday</h3>
				<?php
				get_template_part(
					'template-parts/content',
					'featured-events',
					array(
						'first'  => 50,
						'second' => 174,
					)
				);
				?>
			</div>
			<div class="row">
				<h3 class="featured-event__headline--day-label">Sunday</h3>
				<?php
				get_template_part(
					'template-parts/content',
					'featured-events',
					array(
						'first'  => 200,
						'second' => 183,
					)
				);
				?>
			</div>
		</div>
		<?php if ( isset( $_ENV['CNO_ENV'] ) && 'prod' !== $_ENV["CNO_ENV"] ) : ?>
		<div class="container">
			<div class="row">
				<h3 class="headline">Entertainment</h3>
			</div>
		</div>
		<?php get_template_part( 'template-parts/slider', 'entertainment' ); ?>
		<div class="container">
			<div class="row">
				<div class="col d-flex-column align-items-center">
					<a href="/events" class="btn__fill--primary">See Full Schedule</a>
				</div>
			</div>
		</div>
		<?php endif; ?>
	</section>
	<section id="vendors" class='bg-color-primary'>
		<div class="container">
			<div class="row">
				<h2 class="headline text-white">
					Register Now
				</h2>
			</div>
		</div>
		<?php get_template_part( 'template-parts/slider', 'registrations' ); ?>
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
			$args = array(
				'headline'  => 'Map',
				'content'   => 'Use the interactive map to view the Choctaw Nation capital grounds, the Labor Day Festival amenities and locations.',
				'image_src' => get_the_post_thumbnail_url( get_page_by_title( 'map' ) ),
			);
			?>
			<?php 
			if ( isset( $_ENV['CNO_ENV'] ) && 'prod' !== $_ENV["CNO_ENV"] ) {
				$args['cta_text'] = 'View Map';
				$args['cta_link']  = '/map';
			}
			?>
			<?php $content->two_col_text_and_media( $args ); ?>
		</div>
	</section>
	<section id="facebook">
		<div class="container">
			<?php
			$args = array(
				'headline'     => 'Labor Day Festival on Facebook',
				'content'      => 'Stay up to date with all the festival news by liking our Facebook page, see activities and schedule information, keep up with announcements and view great photos during the event.',
				'cta_text'     => 'Follow On Facebook',
				'cta_external' => true,
				'cta_link'     => 'https://www.facebook.com/ChoctawNationLaborDayFestival',
				'reverse'      => true,
				'image_src'      => '/wp-content/uploads/2023/05/cultural-dancing.jpg',
			);
			?>
			<?php $content->two_col_text_and_media( $args ); ?>
		</div>
	</section>
</main>
<?php
get_footer();