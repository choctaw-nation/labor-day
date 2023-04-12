<?php

/**
 * Basic Header Template
 * 
 */
wp_head();
?>

<!DOCTYPE html>
<html lang="<?php bloginfo('language') ?>">

<head>
	<meta charset="<?php bloginfo('charset'); ?>">
	<meta http-equiv="X-UA-Compatible" content="IE=edge">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<title>
		<?php echo get_bloginfo('name') . " | " . get_bloginfo('description'); ?>
	</title>
</head>

<body <?php body_class() ?>>
	<header class="d-flex" id="site-header">
		<div class="navbar container py-4 d-flex justify-content-between">
			<a href="<?php esc_url(site_url()) ?>" class="logo" aria-label="to Home Page">
				<figure class="logo-image d-inline-block">
					<?php global $SITE_LOGO;
					echo $SITE_LOGO; ?>
					<h1>
						<?php echo bloginfo('name'); ?>
					</h1>
				</figure>
			</a>
			<?php wp_nav_menu(
				array(
					'theme-location' => 'primary_menu',
					'menu_class' => 'navbar__menu p-0 m-0 d-inline-flex',
					'container' => 'nav',
					'container_class' => 'navbar d-flex align-items-center',
				)
			);
			?>
		</div>
	</header>