<?php
/**
 * Homepage Registrations Section
 * Used so people/vendors can sign up for things
 *
 * @package ChoctawNation
 * @since 2.0.3
 */

?>
<section id="vendors" class='text-bg-primary py-5'>
	<div class="container my-5">
		<div class="row">
			<h2 class="headline text-white">
				Register Now
			</h2>
		</div>
	</div>
	<?php get_template_part( 'template-parts/home/slider', 'registrations' ); ?>
	<div class="container">
		<div class="row">
			<div class="col d-flex flex-column">
				<a href="/registrations" class="btn btn-secondary align-self-center mt-5">See All Registrations</a>
			</div>
		</div>
	</div>
</section>
