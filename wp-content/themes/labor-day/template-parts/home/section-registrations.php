<?php
/**
 * Homepage Registrations Section
 * Used so people/vendors can sign up for things
 *
 * @package ChoctawNation
 * @since 2.0.3
 */

?>
<section id="vendors" class="text-bg-primary py-5 d-flex flex-column row-gap-5">
	<div class="container">
		<h2 class="text-white">
			Register Now
		</h2>
	</div>
	<div class="container-fluid">
		<?php get_template_part( 'template-parts/home/slider', 'registrations' ); ?>
	</div>
	<div class="container">
		<div class="row justify-content-center">
			<div class="col-auto">
				<a href="/registrations" class="btn btn-secondary">See All Registrations</a>
			</div>
		</div>
	</div>
</section>