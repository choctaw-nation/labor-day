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
					<div class="countdown " id='countdown'></div>
				</div>
			</div>
		</div>
	</section>
	<?php get_template_part( 'template-parts/aside', 'subscribe' ); ?>
	<section id="about-the-festival" class="fadeIn">
		<div class="container">
			<div class="row">
				<div class="col-lg-4">
					<figure class='great-seal'>
						<?php echo GREAT_SEAL_SVG; ?>
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
				<div class="row">
					<h3 class="featured-event__headline">Saturday</h3>
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
					<h3 class="featured-event__headline">Sunday</h3>
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
			<div class="row">
				<h3>All Entertainment</h3>
				<?php
				get_template_part(
					'template-parts/content',
					'slider',
					array(
						'id'         => 'entertainment',
						'query_args' => array(
							'post_type'      => 'events',
							'post_status'    => 'publish',
							'posts_per_page' => 6,
							'tax_query'      => array(
								array(
									'taxonomy' => 'event_type',
									'field'    => 'slug',
									'terms'    => 'entertainment',
								),
							),
						),
					)
				);
				?>
			</div>
			<div class="row">
				<div class="col">
					<a href="/events" class="btn__fill--primary">See Full Schedule</a>
				</div>
			</div>
		</div>
	</section>
	<section id="vendors" class='bg-color-primary fadeIn'>
		<div class="container-fluid">
			<div class="row">
				<h2 class="headline text-white">
					Register Now
				</h2>
			</div>
			<div class="row">
				<?php
				$query = new WP_Query(
					array(
						'post_type'      => 'page',
						'post_status'    => 'publish',
						'post_parent'    => get_page_by_title( 'Registrations' )->ID,
						'posts_per_page' => -1,
					)
				);
				?>
				<div class="swiper" id="registration-slider">
					<div class="swiper-wrapper">
						<?php
							if ( $query->have_posts() ) :
								while ( $query->have_posts() ) :
									$query->the_post();
									?>
						<div class="swiper-slide">
							<a href="<?php the_permalink(); ?>">
								<div class="slider__image">
									<?php the_post_thumbnail(); ?>
								</div>
								<?php the_title( "<h4 class='slider__info'>", '</h4>' ); ?>
							</a>
						</div>
						<?php endwhile; ?>
						<?php endif; ?>
						<?php wp_reset_postdata(); ?>
					</div>
					<div class="swiper-pagination"></div>
					<div class="swiper-button-prev"></div>
					<div class="swiper-button-next"></div>
				</div>

				<div class="row">
					<div class="col d-flex-column">
						<a href="/registrations" class="btn__fill--secondary align-self-center">See All Registrations</a>
					</div>
				</div>
			</div>
	</section>
	<section id="map" class="fadeIn">
		<div class="container">
			<?php
			$args = array(
				'headline'  => 'Map',
				'content'   => lorem,
				'cta_text'  => 'View Map',
				'cta_link'  => '/map',
				'image_src' => get_the_post_thumbnail_url( get_page_by_title( 'map' ) ),
			);
			?>
			<?php $content->two_col_text_and_media( $args ); ?>
		</div>
	</section>
	<section id="facebook" class="fadeIn">
		<div class="container">
			<?php
			$args = array(
				'headline'     => 'Labor Day Festival on Facebook',
				'content'      => lorem,
				'cta_text'     => 'Follow On Facebook',
				'cta_external' => true,
				'cta_link'     => 'https://www.facebook.com/ChoctawNationLaborDayFestival',
				'reverse'      => true,
			);
			?>
			<?php $content->two_col_text_and_media( $args ); ?>
		</div>
	</section>
</main>
<?php
get_footer();