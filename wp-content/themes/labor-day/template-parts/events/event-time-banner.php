<?php
/**
 * Template part for displaying event time banner
 *
 * @package ChoctawNation
 * @subpackage Events
 */

use ChoctawNation\ACF\Event;

$info    = get_field( 'info' );
$classes = array(
	'col-xl-1',
	'd-flex',
	'flex-column',
	'justify-content-center',
	'align-items-stretch',
	'order-2',
	'order-xl-0',
	'lh-sm',
	'mb-0',
	'fw-bold',
	'text-center',
	'text-white',
	'flex-wrap',
);

$banner_bg = array(
	'Friday'   => 'text-bg-primary',
	'Saturday' => 'text-bg-secondary',
	'Sunday'   => 'text-bg-primary-light',
);
$classes[] = $banner_bg[ $info['day'] ];
$month     = 'AUG';
$event     = new Event( get_the_ID() );
?>
<aside class="<?php echo implode( ' ', $classes ); ?>">
	<div class="d-flex flex-column align-items-center justify-content-start flex-wrap my-1 my-xl-0">
		<span class=" fw-bold text-uppercase"><?php $event->the_date( 'M' ); ?></span>
		<span class="fw-bold text-uppercase fs-1">
			<?php $event->the_date( 'j' ); ?>
		</span>
		<span class="fw-bold text-uppercase">
			<?php $event->the_date( 'l' ); ?>
		</span>
	</div>
	<div class="fw-bold text-uppercase border-top border-1 border-white mt-xl-2 py-1 pt-xl-3">
		<?php $event->the_times(); ?>
	</div>
</aside>
