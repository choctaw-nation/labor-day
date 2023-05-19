<?php
/**
 * The Weather Alert Widget.
 * Will show message if message is newer or cookie has expired.
 */

$weather_alert_message = get_field( 'alert_text', 'option' );

if ( isset( $_COOKIE['weather_alert'] ) && $_COOKIE['weather_alert'] === $weather_alert_message ) {
	return;
} else {
	$expiry = time() + 600; // expire after 10 minutes
	setcookie( 'weather_alert', $weather_alert_message, $expiry, '/' );
}
?>
<div class="weather-alert__overlay overlay">
	<dialog id="weatherAlert" class="weather-alert">
		<span class="weather-alert__message">
			<?php echo $weather_alert_message; ?>
		</span>
		<button id="confirmBtn" value="default">Submit</button>
	</dialog>
</div>