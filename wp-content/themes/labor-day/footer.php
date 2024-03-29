<?php
/**
 * The Theme Footer
 *
 * @package ChoctawNation
 */

$has_weather_alert = get_field( 'enable_weather_alert', 'option' );
?>
<?php
if ( $has_weather_alert ) {
	get_template_part( 'template-parts/aside', 'weather-alert' );
}
?>
<aside class="footer-callout">
	<div class="footer-callout__bg"></div>
	<div class="container">
		<div class="row justify-content-center align-items-center">
			<figure class="footer-callout__image col-lg-6 col-sm-12 gx-5" data-aos='fade-right'>
				<?php extract( get_field( 'footer_image', 'options' ) ); ?>
				<img src="<?php echo $sizes['large']; ?>" alt="<?php echo $alt; ?>" srcset="<?php echo wp_get_attachment_image_srcset( $id ); ?>">
			</figure>
			<div class="footer-callout__text col-sm-12 col-lg-6 d-flex flex-column gx-5">
				<div class="h4 headline">Choctaw Nation Capitol Grounds</div>
				<div class="subheadline">Council House Rd</div>
				<div class="subheadline">Tushkahoma, OK 74574</div>
				<a href="https://goo.gl/maps/se2k5hvdoozfuqHt7" class="btn__fill--primary d-block align-self-start">Get Directions</a>
			</div>
		</div>
	</div>
</aside>
<footer class="footer text-white">
	<div class="container my-5 text-center">
		<div class="row">
			<div class="col">
				<a href="<?php echo esc_url( site_url() ); ?>" class="logo w-100 h-100" aria-label='to Home Page'>
					<figure class="logo-image d-inline-block ratio">
						<img src="<?php echo get_template_directory_uri() . '/images/labor-day-logo.svg'; ?>" alt="Labor Day Festival Logo" loading='lazy'>
						<span aria-label="to Home Page">
							<?php echo bloginfo( 'name' ); ?>
						</span>
					</figure>
				</a>
			</div>
			<div class="col footer-navbar__container">
				<?php
				if ( has_nav_menu( 'footer_menu-1' ) ) {
					wp_nav_menu(
						array(
							'theme_location'  => 'footer_menu-1',
							'menu_class'      => 'footer-navbar__menu',
							'container'       => 'nav',
							'container_class' => 'footer-navbar',
						)
					);
				}
				if ( has_nav_menu( 'footer_menu-2' ) ) {
					wp_nav_menu(
						array(
							'theme_location'  => 'footer_menu-2',
							'menu_class'      => 'footer-navbar__menu',
							'container'       => 'nav',
							'container_class' => 'footer-navbar',
						)
					);
				}
				?>
			</div>
			<div class="col socials">
				<?php extract( get_field( 'socials', 'options' ) ); ?>
				<a aria-label='to the Choctaw Nation Labor Day Facebook page' href="<?php echo $facebook; ?>" target="_blank" rel="noreferrer noopener" class="social-icon">
					<i class='fa-brands fa-facebook'></i>
				</a>
				<a aria-label='to the Choctaw Nation Instagram' href="<?php echo $instagram; ?>" target="_blank" rel="noreferrer noopener" class="social-icon">
					<i class='fa-brands fa-instagram'></i>
				</a>
			</div>
		</div>
	</div>
	<div id=" copyright" class="py-5 text-center">
		<?php echo '&copy;&nbsp;' . gmdate( 'Y' ) . " <a href='https://www.choctawnation.com' target='_blank' rel='noopener noreferrer' class='text-white'>Choctaw Nation of Oklahoma</a>. All Rights Reserved."; ?>
	</div>
</footer>
<?php wp_footer(); ?>
</body>

</html>
