<?php
/**
 * The Aside to Subscribe to updates
 */

$phone_number = '888777';
$message      = 'LABORDAY'
?>
<aside class="subscribe">
	<div class="container">
		<div class="row">
			<div class="col">
				<h3 class="headline subscribe__headline">Be the first to know about the 2023 Choctaw Labor Day Festival</h3>
			</div>
		</div>
		<div class="row cta">
			<div class="cta__email col-lg-4">
				<input type="email" name="email" id="email" placeholder="Email Address" />
				<button type="button" id='subscribe-modal-trigger' data-bs-toggle="modal" data-bs-target="#subscribe-modal">Sign Up</button>
			</div>
			<div class="cta__text col-lg-4">
				<a href="<?php echo "sms:{$phone_number}?&body={$message}"; ?>" class="btn__fill--secondary">Text <strong>LABORDAY</strong> to <strong>888777</strong>
				</a>
			</div>
		</div>
	</div>
</aside>
<div class="modal fade" id="subscribe-modal" tabindex="-1" aria-labelledby="subscribe-modalLabel" aria-hidden="true">
	<div class="modal-dialog modal-dialog-centered modal-dialog-scrollable">
		<div class="modal-content">
			<div class="modal-body">
				<?php echo do_shortcode( '[gravityform id="11"]' ); ?>
			</div>
		</div>
	</div>
</div>