<?php
/** Share Event Modal
 *
 * @since 0.10.0
 */

$shareable_url   = get_the_permalink();
$redirect_url    = home_url() . '/events';
$facebook_app_id = FACEBOOK_APP_ID;

?>
<div class="modal fade" id="shareEventModal" tabindex="-1" aria-labelledby="shareEventModalLabel" aria-hidden="true">
	<div class="modal-dialog modal-dialog-centered">
		<div class="modal-content">
			<div class="modal-header">
				<h1 class="modal-title h4" id="shareEventModalLabel">Share This Event</h1>
				<button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
			</div>
			<div class="modal-body">
				<ul class="share-locations">
					<li>
						<a href=<?php echo "https://www.facebook.com/dialog/share?app_id={$facebook_app_id}&display=popup&href={$shareable_url}&redirect_uri={$redirect_url}"; ?>
						   title="Share on Facebook" target="_blank" class="share-locations__location--facebook btn__outline--secondary">
							<i class="fa-brands fa-facebook"></i> Share on
							Facebook
						</a>
					</li>
					<li>
						<a href='<?php echo "sms:?&body=Halito%20(Hello)! I'm going to {$post->post_title} and I thought you'd like to check it out, too! Learn more at {$shareable_url}"; ?>'
						   target="_blank" class="share-locations__location--text btn__outline--secondary">
							<i class="fa-solid fa-comment"></i> Share via
							SMS
						</a>
					</li>
					<li>
						<a href='
						<?php
						echo "mailto:?subject=Check out this event!&body=Halito%20(Hello)! I'm going to {$post->post_title} and I thought you'd like to check it out, too! Learn
						   more at {$shareable_url}.";
						?>
						' title="Share via Email" class="share-locations__location--email btn__outline--secondary">
							<i class="fa-solid fa-envelope-open-text"></i>
							Share via Email
						</a>
					</li>
				</ul>
			</div>
		</div>
	</div>
</div>