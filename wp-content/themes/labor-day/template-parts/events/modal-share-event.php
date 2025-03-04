<?php
/** Share Event Modal
 *
 * @package ChoctawNation
 * @subpackage Events
 */

if ( is_plugin_active( 'cno-facebook-share/cno-facebook-share.php' ) ) {
	$facebook_app    = new CNO_Facebook_Link_Generator( get_the_permalink() );
	$facebook_app_id = $facebook_app->facebook_app_id;
} else {
	if ( ! defined( 'FACEBOOK_APP_ID' ) ) {
		return;
	}
	$facebook_app_id = empty( FACEBOOK_APP_ID ) ? null : FACEBOOK_APP_ID;
}
$shareable_url = get_the_permalink();
$redirect_url  = home_url( '/events' );


?>
<div class="modal fade" id="shareEventModal" tabindex="-1" aria-labelledby="shareEventModalLabel" aria-hidden="true">
	<div class="modal-dialog modal-dialog-centered">
		<div class="modal-content">
			<div class="modal-header">
				<h1 class="modal-title h4" id="shareEventModalLabel">Share This Event</h1>
				<button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
			</div>
			<div class="modal-body">
				<ul class="share-locations list-unstyled p-0 m-0 fs-6">
					<li class="my-3">
						<?php $facebook_app->the_link(); ?>
					</li>
					<li class="my-3">
						<a href="<?php echo "sms:?&body=Halito%20(Hello)! I'm going to {$post->post_title} and I thought you'd like to check it out, too! Learn more at {$shareable_url}"; ?>"
							target=" _blank" class="share-locations__location--text btn__outline--secondary">
							<i class="fa-solid fa-comment"></i> Share via
							SMS
						</a>
					</li>
					<li class="my-3">
						<a href='
						<?php
						echo "mailto:?subject=Check out this event!&body=Halito%20(Hello)! I'm going to {$post->post_title} and I thought you'd like to check it out, too! Learn
						   more at {$shareable_url}.";
						?>
						' title=" Share via Email" class="share-locations__location--email btn__outline--secondary">
							<i class="fa-solid fa-envelope-open-text"></i>
							Share via Email
						</a>
					</li>
				</ul>
			</div>
		</div>
	</div>
</div>