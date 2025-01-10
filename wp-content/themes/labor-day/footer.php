<?php
/**
 * The Theme Footer
 *
 * @package ChoctawNation
 */

$has_weather_alert = get_field( 'enable_weather_alert', 'option' );
if ( $has_weather_alert ) {
	get_template_part( 'template-parts/aside', 'weather-alert' );
}
?>
<aside class="footer-callout py-5 px-3 p-lg-0 mt-5 mb-lg-5 position-relative z-1">
	<div class="footer-callout__bg inset-0 bg-tertiary position-absolute"></div>
	<div class="container position-relative z-2">
		<div class="row justify-content-center align-items-center gx-5">
			<div class="col-lg-6 col-sm-12" data-aos='fade-right'>
				<figure class="ratio ratio-16x9">
					<?php
					$footer_image = get_field( 'footer_image', 'options' );
					echo wp_get_attachment_image(
						$footer_image['ID'],
						'large',
						false,
						array(
							'class'   => 'object-fit-cover',
							'loading' => 'lazy',
						)
					);
					?>
				</figure>
			</div>
			<div class="footer-callout__text col-sm-12 col-lg-6 d-flex flex-column">
				<div class="h4 text-primary-dark">Choctaw Nation Capitol Grounds</div>
				<p class="fs-6 mb-3 text-primary-dark">
					Council House Rd<br />Tuskahoma, OK 74574
				</p>
				<a href="https://goo.gl/maps/se2k5hvdoozfuqHt7" class="btn btn-primary d-block align-self-start">Get Directions</a>
			</div>
		</div>
	</div>
</aside>
<footer class="text-bg-primary-dark position-relative p-3">
	<div class="container">
		<div class="row row-cols-1 row-cols-lg-3 justify-content-between align-items-stretch row-gap-4">
			<div class="col">
				<a href="<?php echo esc_url( site_url() ); ?>" class="logo w-100 h-100" aria-label='to Home Page'>
					<figure class="logo-image d-inline-block mb-0 p-3">
						<img src="<?php echo get_template_directory_uri() . '/images/labor-day-logo.svg'; ?>" alt="Labor Day Festival Logo" loading="lazy"
							 class="w-100 h-100 object-fit-contain">
					</figure>
				</a>
			</div>
			<?php
			$has_menus = has_nav_menu( 'footer_menu-1' ) || has_nav_menu( 'footer_menu-2' );
			$nav_menus = array( 'footer_menu-1', 'footer_menu-2' );

			if ( $has_menus ) {
				echo '<div class="col gx-0 d-flex justify-content-evenly align-items-center">';
				foreach ( $nav_menus as $nav_menu ) {
					if ( has_nav_menu( $nav_menu ) ) {
						wp_nav_menu(
							array(
								'theme_location'  => $nav_menu,
								'menu_class'      => 'navbar-nav ms-0',
								'container'       => 'nav',
								'container_class' => 'footer-navbar fs-6',
							)
						);
					}
				}
				echo '</div>';
			}
			?>
			<div class="col socials d-flex align-items-center justify-content-center mx-auto mt-3 m-lg-0 column-gap-3">
				<?php extract( get_field( 'socials', 'options' ) ); ?>
				<a aria-label='to the Choctaw Nation Labor Day Facebook page' href="<?php echo $facebook; ?>" target="_blank" rel="noreferrer noopener" class="social-icon mx-2">
					<i class='fs-3 fa-brands fa-facebook'></i>
				</a>
				<a aria-label='to the Choctaw Nation Instagram' href="<?php echo $instagram; ?>" target="_blank" rel="noreferrer noopener" class="social-icon mx-2">
					<i class='fs-3 fa-brands fa-instagram'></i>
				</a>
			</div>
		</div>
		<div class="row justify-content-center text-center">
			<div class="col-auto">
				&copy; <?php echo date( 'Y' ); // phpcs:ignore WordPress.DateTime.RestrictedFunctions.date_date ?> <a href="https://www.choctawnation.com" target="_blank"
				   rel="noopener noreferrer">Choctaw Nation of Oklahoma</a>. All Rights
				Reserved.
			</div>
		</div>
	</div>
</footer>
<?php wp_footer(); ?>
</body>

</html>