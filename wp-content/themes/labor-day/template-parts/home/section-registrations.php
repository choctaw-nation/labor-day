<?php
/**
 * Homepage Registrations Section
 * Used so people/vendors can sign up for things
 *
 * @package ChoctawNation
 * @since 2.0.3
 */

?>
<section id="vendors" class='bg-primary'>
	<div class="container">
		<div class="row">
			<h2 class="headline text-white">
				Register Now
			</h2>
		</div>
	</div>
	<?php get_template_part( 'template-parts/home/slider', 'registrations' ); ?>
	<div class="container">
		<div class="row">
			<div class="col d-flex-column">
				<a href="/registrations" class="btn__fill--secondary align-self-center">See All Registrations</a>
			</div>
		</div>
	</div>
</section>