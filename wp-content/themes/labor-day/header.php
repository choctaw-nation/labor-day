<?php // phpcs:ignore
/**
 * Basic Header Template
 */

?>

<!DOCTYPE html>
<html lang="<?php bloginfo( 'language' ); ?>">

<head>
	<meta charset="<?php bloginfo( 'charset' ); ?>">
	<meta http-equiv="X-UA-Compatible" content="IE=edge">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png">
	<link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png">
	<link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png">
	<link rel="manifest" href="/site.webmanifest">
	<link rel="mask-icon" href="/safari-pinned-tab.svg" color="#000000">
	<title>
		<?php
		$title = $post->post_title;
		if ( is_post_type_archive() ) {
			$title = 'Schedule';
		} echo $title . " | " .  get_bloginfo( 'name' ); ?>
	</title>
	<link rel="manifest" href="/manifest.json">
	<?php wp_head(); ?>
</head>

<body <?php body_class() ?>>
	<header class="d-flex" id="site-header">
		<div class="navbar container gx-5 py-4 d-flex justify-content-between">
			<a href="<?php echo esc_url( site_url() ); ?>" class="logo" aria-label="to Home Page">
				<figure class="logo-image d-inline-block">
					<?php echo SITE_LOGO; ?>
					<h1>
						<?php echo bloginfo( 'name' ); ?>
					</h1>
				</figure>
			</a>
			<?php 
			wp_nav_menu(
				array(
					'theme_location'  => 'primary_menu',
					'menu_class'      => 'navbar__menu p-0 m-0 d-inline-flex',
					'container'       => 'nav',
					'container_class' => 'navbar d-none d-lg-flex align-items-center',
					'walker'          => new CNO_Nav_Walker()
				)
			);?>
			<?php get_template_part( 'template-parts/nav', 'mobile-menu' ); ?>
		</div>
	</header>