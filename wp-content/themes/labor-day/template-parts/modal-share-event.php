<?php
/** Share Event Modal
 *
 * @since 0.10.0
 */

$shareable_url = home_url();
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
						<a href="<?php echo 'https://www.facebook.com/sharer/sharer.php?url=' . $shareable_url; ?>" title="Share on Facebook" target="_blank"
						   class="share-locations__location--facebook btn btn-facebook">
							<i class="fa-brands fa-facebook"></i> Share on Facebook</a>
					</li>
					<li>
						<a href="<?php echo 'https://twitter.com/intent/tweet?text=Twitter%20Text&url=' . $shareable_url; ?>" target="_blank"
						   class="share-locations__location--text btn btn-twitter">
							<i class="fa-solid fa-comment"></i> Share via SMS</a>
					</li>
					<li>
						<a href="mailto:?subject=Check out this event!" title="Share via Email" class="share-locations__location--email btn btn-email"><i
							   class="fa-solid fa-envelope-open-text"></i> Share via Email</a>
					</li>
				</ul>
			</div>
		</div>
	</div>
</div>