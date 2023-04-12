<?php

/**
 * Homepage Template
 * 
 * @author KJ Roelke
 * @since  1.0
 */

$content = new ContentSectionComponents();
global $lorem;
enqueue_page_style('frontPage');

get_header(); ?>
<main class="site-content">
	<?php $background_image_url = get_field('hero')['background_image']; ?>
	<section class='w-100' style="background-image:url('<?php echo $background_image_url; ?>');" id='hero'>
		<div class="overlay"></div>
		<div class="container">
			<div class="row">
				<div class="col">
					<span class="headline">September 1 &ndash; 3, 2023</span>
					<span class="subheadline">[Countdown]</span>
				</div>
			</div>
		</div>
	</section>
	<?php get_template_part('template-parts/aside', 'subscribe'); ?>
	<section id="about-the-festival">
		<div class="container">
			<div class="row">
				<div class="col-lg-4">
					<figure class='great-seal'>
						<?php global $GREAT_SEAL_SVG;
						echo $GREAT_SEAL_SVG; ?>
					</figure>
				</div>
				<div class="col-lg-8">
					<p>The Choctaw people have gathered on the grounds of the Choctaw Capitol for many years during the Labor Day weekend to celebrate family, fellowship together and to
						honor Choctaw traditions. Enjoy cultural events like stickball games and the princess contest, concerts, arts and crafts, a free 5k run and much more! As in Labor
						Days past, the weekend schedule is packed full of events to accommodate those who enjoy sporting events, traditional events like gourd dancing, princess pageants, or
						just family time on the grounds. Join us Sunday for Church services and stay for the all-day Chahta gospel singing. Our Labor Day weekend will be a great experience
						for everyone as we fellowship together and honor our Choctaw traditions.</p>
				</div>
			</div>
		</div>
	</section>
	<?php get_template_part('template-parts/aside', 'text-callout', array('color' => 'secondary')); ?>
	<section id="events">
		<div class="container">
			<div class="row">
				<h2>Special Guest Neal Mccoy</h2>
				<div class="big-feature">
				</div>
			</div>

			<div class="row">
				<h3>Entertainment</h3>
				<div class="col">Slider</div>
				<div class="col"><a href="/schedule" class="btn__fill--primary">See Full Schedule</a></div>
			</div>
		</div>
	</section>
	<section id="vendors" class='bg-color-primary'>
		<div class="container">
			<div class="row">
				<h2 class="text-white">
					Register Now
				</h2>
			</div>
			<div class="row">
				<div class="col">SLIDER</div>
			</div>
			<div class="row">
				<div class="col"><a href="/registrations" class="btn__fill--primary">See All Registrations</a></div>
			</div>
		</div>
	</section>
	<section id="map">
		<div class="container">
			<?php
			$args = array(
				'headline' => 'Map',
				'content' => $lorem,
				'cta_text' => "View Map",
				'cta_link' => '/map'
			); ?>
			<?php $content->two_col_text_and_media($args); ?>
		</div>
	</section>
	<section id="facebook">
		<div class="container">
			<?php
			$args = array(
				'headline' => 'Labor Day Festival on Facebook',
				'content' => $lorem,
				'cta_text' => "Follow On Facebook",
				'cta_external' => true,
				'cta_link' => 'https://facebook.com',
				'reverse' => true,
			); ?>
			<?php $content->two_col_text_and_media($args); ?>
		</div>
	</section>

</main>
<?php get_footer(); ?>