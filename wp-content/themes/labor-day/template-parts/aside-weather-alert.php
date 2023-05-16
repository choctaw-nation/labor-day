<?php
/**
 * The Weather Alert Widget
 */

$weather_alert_message = get_field( 'alert_text', 'option' );
?>
<div class="weather-alert__overlay overlay">
	<dialog id="weatherAlert" class="weather-alert">
		<span class="weather-alert__message">
			<?php echo $weather_alert_message; ?>
		</span>
		<button id="confirmBtn" value="default">Submit</button>
	</dialog>
</div>