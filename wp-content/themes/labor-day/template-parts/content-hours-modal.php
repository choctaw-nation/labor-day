<?php
/**
 * Hours of Operation Modal
 */

$hours = get_field('operational_hours','options');
?>
<div class="modal fade" id="hoursModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
	<div class="modal-dialog modal-dialog-centered modal-dialog-scrollable">
		<div class="modal-content">
			<div class="modal-header">
				<h1 class="modal-title headline h4" id="exampleModalLabel">Hours of Operations</h1>
				<button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
			</div>
			<div class="modal-body">
				<ul class="hours-list">
				<?php foreach($hours as $hour) : ?>
					<li class="hours-list__item hours-list-item">
					<span class='hours-list-item__title h4'><?php echo $hour['title'] ?></span>&nbsp;
					<div class="hours-list-item__time">
						<span class='hours-list-item__time--open'><?php echo $hour['open']; ?></span>&nbsp;&ndash;&nbsp;<span class='hours-list-item__time--close'><?php echo $hour['closes']; ?></span>
					</div>
					<?php
					for($i = 0; $i < 3; $i++) {
						if (2 > $i) {
							echo $hour['days'][$i] . ',&nbsp;';
						} else {
							echo $hour['days'][$i];
						}
					}
					?>
					</li>
				<?php endforeach; ?>

				</ul>
			</div>
		</div>
	</div>
</div>