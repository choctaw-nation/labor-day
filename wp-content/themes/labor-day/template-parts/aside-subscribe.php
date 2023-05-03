<?php
/**
 * The Aside to Subscribe to updates
 *
 * @package ChoctawNation
 */

$phone_number = '888777';
$message = 'LABORDAY'
?>
<aside class="subscribe">
	<div class="container">
		<div class="row">
			<div class="col">
				<h3 class="headline subscribe__headline">Be the first to know about the 2023 Choctaw Labor Day Festival</h3>
			</div>
		</div>
		<div class="row cta">
			<div class="cta__email col-lg-6">
				<input type="email" name="email" id="email" placeholder="Email Address" />
				<button type="submit">Sign Up</button>
			</div>
			<div class="cta__text col-lg-6"><a href="<?php echo "sms:{$phone_number}?&body={$message}"; ?>" class="btn__fill--secondary">Text <strong>LABORDAY</strong> to
					<strong>888777</strong></a></div>
		</div>
	</div>
</aside>
