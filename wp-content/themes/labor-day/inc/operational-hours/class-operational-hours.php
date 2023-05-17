<?php
/** Operational Hours */
class Operational_Hours {
	private $hours = array();
	private $day_order = array('Friday','Saturday','Sunday');
	public function __construct(array $hours_field) {
		$this->hours = $hours_field;
		usort( $this->hours, array( $this, 'compare_hours' ) );
	}
	public function list_the_hours() {
		echo "<ul class='hours-list'>";
		foreach($this->hours as $hour) : ?>
			<li class="hours-list__item hours-list-item">
				<span class='hours-list-item__title h4'><?php echo $hour['title'] ?></span>&nbsp;
				<div class="hours-list-item__time">
					<span class='hours-list-item__time--open'><?php echo $hour['open']; ?></span>&nbsp;&ndash;&nbsp;
					<span class='hours-list-item__time--close'><?php echo $hour['closes']; ?></span>
				</div>
				<span class="hours-list-item__days">
					<?php
					for($i = 0; $i < count($hour['days']); $i++) {
						if (count($hour['days']) - 1 > $i) {
							echo $hour['days'][$i] . ',&nbsp;';
						} else {
							echo $hour['days'][$i];
						}
					}
					?>
				</span>
			</li>
		<?php 
		endforeach;
		echo "</ul>";
	}
	private function compare_hours($a, $b) {			
			// Get the day order index for each entry
			$day_index_a = array_search($a["days"][0], $this->day_order);
			$day_index_b = array_search($b["days"][0], $this->day_order);
			
			// Compare by day index first
			if ($day_index_a !== $day_index_b) {
				return $day_index_a - $day_index_b;
			}
			
			// Compare by open time if the day is the same
			return strtotime($a["open"]) - strtotime($b["open"]);
	}
}
