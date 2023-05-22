<?php
/**
 * The Theme Footer
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
			<figure class="footer-callout__image col-lg-6 col-sm-12">
				<img src="<?php echo get_field( 'footer_image', 'options' )['sizes']['large']; ?>" alt="" srcset="">
			</figure>
			<div class="footer-callout__text col-sm-12 col-lg-6 d-flex flex-column">
				<div class="h4 headline">Choctaw Nation Capitol Grounds</div>
				<div class="subheadline">Council House Rd</div>
				<div class="subheadline">Tushkahoma, OK 74574</div>
				<a href="#" class="btn__fill--primary d-block align-self-start">Get Directions</a>
			</div>
		</div>
	</div>
</aside>
<footer class="footer text-white">
	<div class="container my-5 text-center">
		<div class="row">
			<div class="col"><a href="<?php echo esc_url( site_url() ); ?>" class="logo">
					<figure class="logo-image d-inline-block">
						<?php echo SITE_LOGO; ?>
						<span aria-label="to Home Page">
							<?php echo bloginfo( 'name' ); ?>
						</span>
					</figure>
				</a>
			</div>
			<div class="col footer-navbar__container">
				<?php wp_nav_menu(
					array(
						'theme_location'  => 'footer_menu-1',
						'menu_class'      => 'footer-navbar__menu',
						'container'       => 'nav',
						'container_class' => 'footer-navbar',
					)
				);?>
				<?php wp_nav_menu(
					array(
						'theme_location'  => 'footer_menu-2',
						'menu_class'      => 'footer-navbar__menu',
						'container'       => 'nav',
						'container_class' => 'footer-navbar',
					)
				);?>
			</div>
			<div class="col socials">
				<?php extract(get_field('socials', 'options')); ?>
				<a href="<?php echo $facebook; ?>" target="_blank" rel="noreferrer noopener" class="social-icon">
					<i class='fa-brands fa-facebook'></i>
				</a>
				<a href="<?php echo $instagram; ?>" target="_blank" rel="noreferrer noopener" class="social-icon">
					<i class='fa-brands fa-instagram'></i>
				</a>
			</div>
		</div>
	</div>
	<div id=" copyright" class="py-5 text-center">
		<?php echo "&copy;&nbsp;" . gmdate( 'Y' ) .  " Choctaw Nation of Oklahoma. All Rights Reserved."; ?>
	</div>
</footer>
<?php wp_footer(); ?>
</body>

</html>