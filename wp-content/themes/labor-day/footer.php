<?php
/**
 * Basic Footer Template
 *
 * @since 1.0
 * @package ChocatwNation
 */

$current_year = date("Y");
?>
<aside class="footer-callout">
	<div class="footer-callout__bg"></div>
	<div class="container">
		<div class="row">
			<div class="col footer-callout__image">
				<figure><img src="<?php echo get_field('footer_image', 'options')['sizes']['large']; ?>" alt="" srcset=""></figure>
			</div>
			<div class="col footer-callout__text">
				<div class="h4 headline">Choctaw Nation Capitol Grounds</div>
				<div class="subheadline">Council House Rd</div>
				<div class="subheadline">Tushkahoma, OK 74574</div>
				<a href="#" class="btn__fill--primary">Get Directions</a>
			</div>
		</div>
	</div>
</aside>
<footer class="footer text-white">
	<div class="container my-5 text-center">
		<div class="row">
			<div class="col"><a href="<?php esc_url(site_url()) ?>" class="logo">
					<figure class="logo-image d-inline-block">
						<?php echo SITE_LOGO; ?>
						<span aria-label="to Home Page">
							<?php echo bloginfo('name') ?>
						</span>
					</figure>
				</a>
			</div>
			<div class="col footer-navbar__container">
				<?php wp_nav_menu(
					array(
						'theme_location' => 'footer_menu-1',
						'menu_class' => 'footer-navbar__menu',
						'container' => 'nav',
						'container_class' => 'footer-navbar',
					)
				);?>
				<?php wp_nav_menu(
					array(
						'theme_location' => 'footer_menu-2',
						'menu_class' => 'footer-navbar__menu',
						'container' => 'nav',
						'container_class' => 'footer-navbar',
					)
				);?>
			</div>
			<div class="col socials">
				<?php extract(get_field('socials', 'options')); ?>
				<a href="<?php echo $facebook; ?>" target="_blank" rel="noreferrer noopener" class="social-icon">
					<?php echo FACEBOOK_LOGO; ?>
				</a>
				<a href="<?php echo $instagram; ?>" target="_blank" rel="noreferrer noopener" class="social-icon">
					<?php echo INSTAGRAM_LOGO; ?>
				</a>
			</div>
		</div>
	</div>
	<div id=" copyright" class="py-5 text-center">
		<?php echo "&copy;&nbsp; {$current_year} Choctaw Nation of Oklahoma. All Rights Reserved."; ?>
	</div>
</footer>
<?php wp_footer(); ?>
</body>

</html>
