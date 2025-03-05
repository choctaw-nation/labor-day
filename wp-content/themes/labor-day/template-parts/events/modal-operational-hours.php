<?php
/**
 * Hours of Operation Modal
 *
 * @package ChoctawNation
 * @subpackage Events
 */

$hours = new Operational_Hours( get_field( 'operational_hours', 'options' ) );
?>
<div class="modal fade" id="hoursModal" tabindex="-1" aria-labelledby="operationalHoursModal" aria-hidden="true">
	<div class="modal-dialog modal-lg modal-dialog-centered modal-dialog-scrollable">
		<div class="modal-content">
			<div class="modal-header">
				<h1 class="modal-title text-primary-dark h4" id="operationalHoursModal">Hours of Operations</h1>
				<button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
			</div>
			<div class="modal-body">
				<?php $hours->list_the_hours(); ?>
			</div>
		</div>
	</div>
</div>