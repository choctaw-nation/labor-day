<?php
/**
 * Single Event Template (Overrides Plugin Template)
 *
 * @package ChoctawNation
 * @subpackage Events
 */

wp_enqueue_script( 'add-to-schedule' );
get_header();
extract( get_field( 'info' ) );
?>
<div class="container">
	<div class="row">
		<?php
		get_template_part(
			'template-parts/aside',
			'breadcrumb',
			array(
				'link' => '/events',
				'text' => 'Back to All Events',
			)
		);
		?>
	</div>
	<article class="cno-event position-relative py-5">
		<?php if ( has_post_thumbnail() ) : ?>
		<figure class="cno-event__image ratio ratio-16x9">
			<?php the_post_thumbnail( 'full', array( 'class' => 'w-100 h-100 object-fit-contain' ) ); ?>
		</figure>
		<?php endif; ?>
		<h1 class="cno-event__title headline" <?php echo ( has_post_thumbnail() ) ? '' : "style='grid-row:1/2;'"; ?>> <?php the_title(); ?></h1>
		<div class="sidebar position-relative h-100 d-flex flex-column align-items-stretch">
			<aside class="cno-event-meta">
				<div class="text-bg-tertiary mb-4 p-4">
					<?php extract( get_field( 'info' ) ); ?>
					<div class="cno-event-meta__day">
						<?php echo $day . ', ' . cno_get_the_date( $day ); ?>
					</div>
					<div class="cno-event-meta__start-time">
						<strong>Start Time:</strong> <?php echo $start_time; ?>
					</div>
					<?php if ( ! empty( $end_time ) ) : ?>
					<div class="event-meta__start-time">
						<strong>End Time: </strong><?php echo $end_time; ?>
					</div>
					<?php endif; ?>
					<div class="cno-event-meta__location">
						<?php
						$event_locations = get_the_terms( $post, 'event_location' );
						if ( ! empty( $event_locations ) && ! is_wp_error( $event_locations ) ) {
							foreach ( $event_locations as $location ) {
								echo ' <b>Location:</b> ' . $location->name;
							}
						}
						?>
					</div>
				</div>
				<div class="d-flex column-gap-3">
					<button class="bg-transparent border-0 text-primary" data-add-to-schedule="true" data-id="<?php echo get_the_ID(); ?>">
						<i class="fa-solid fa-plus"></i>&nbsp;Add to Schedule
					</button>
					<button class="bg-transparent border-0 text-grey" data-bs-toggle="modal" data-bs-target="#shareEventModal">
						<i class="fa-solid fa-share"></i>
						&nbsp;Share
					</button>
				</div>
			</aside>
		</div>
		<section class="cno-event__about" <?php echo ( has_post_thumbnail() ) ? '' : "style='grid-row:2/3;'"; ?>>
			<div class="fs-6">
				<?php the_field( 'description' ); ?>
			</div>
		</section>
	</article>
</div>
<?php
get_template_part( 'template-parts/events/modal', 'share-event' );
get_footer();
