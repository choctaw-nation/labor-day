<?php
/**
 * Hero Section
 * Generates the Hero section for every page
 *
 * @package ChoctawNation
 * @subpackage Content
 * @since 2.0.0
 */

use ChoctawNation\ACF\Hero;
$hero_fields = get_field( 'hero' );
$hero        = new Hero( $post->ID, get_field( 'hero' ) );
?>
<section id="hero" class="hero p-0 position-relative">
	<?php
	if ( $hero->has_background_image ) {
		$hero->the_image( 'w-100 hero-image object-fit-cover h-100 mx-auto my-0' );
	}
	?>
	<div class="container align-self-center position-relative py-5">
		<div class="row">
			<div class="col">
				<?php the_title( "<h1 class='headline pb-3 fs-1'>", '</h1>' ); ?>
				<span class="subheadline mb-5 fs-6">
					<?php $hero->the_subheadline(); ?>
				</span>
			</div>
		</div>
	</div>
</section>
