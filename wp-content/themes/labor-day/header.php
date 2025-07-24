<?php
/**
 * Basic Header Template
 *
 * @package ChoctawNation
 */

use ChoctawNation\Navwalker;

?>

<!DOCTYPE html>
<html lang="<?php bloginfo( 'language' ); ?>">

<head>
	<meta charset="<?php bloginfo( 'charset' ); ?>">
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<meta http-equiv="X-UA-Compatible" content="IE=edge">
	<link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png">
	<link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png">
	<link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png">
	<link rel="mask-icon" href="/safari-pinned-tab.svg" color="#000000">
	<?php wp_head(); ?>
</head>

<body <?php body_class( array( 'w-100' ) ); ?>>
	<?php wp_body_open(); ?>
	<header class="text-bg-primary-dark" id="site-header">
		<div class="container-lg">
			<nav class="navbar navbar-expand-lg">
				<a href="<?php echo esc_url( site_url() ); ?>" class="logo flex-grow-0 w-auto" aria-label="to Home Page">
					<figure class="logo-image d-inline-block mb-0 p-3 w-auto">
						<img src="<?php echo get_template_directory_uri() . '/images/labor-day-logo.svg'; ?>" alt="Labor Day Festival Logo" loading="eager" class="h-100 object-fit-contain"
							data-spai-eager />
					</figure>
				</a>
				<button class="navbar-toggler" type="button" data-bs-toggle="offcanvas" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false"
						aria-label="Toggle navigation">
					<span class="navbar-toggler-icon"></span>
				</button>
				<div class="offcanvas offcanvas-end ms-auto flex-grow-0" id='navbarNav' tabindex="-1">
					<div class="offcanvas-header mt-5">
						<button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"
								style='--bs-btn-close-color:white;filter:var(--bs-btn-close-white-filter)'></button>
					</div>
					<?php
					if ( has_nav_menu( 'primary_menu' ) ) {
						wp_nav_menu(
							array(
								'theme_location'  => 'primary_menu',
								'menu_class'      => 'p-0 m-0 navbar-nav align-items-lg-center',
								'container'       => 'div',
								'container_class' => 'offcanvas-body',
								'walker'          => new Navwalker(),
							)
						);
					}
					?>
				</div>

			</nav>
		</div>
	</header>
