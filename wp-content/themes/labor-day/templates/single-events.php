<?php
/**
 * Single Event Template (Overrides Plugin Template)
 */

get_header();
extract( get_field( 'info' ) );
?>
<div class="container">
	<?php get_template_part( 'template-parts/aside', 'breadcrumb' ); ?>
	<article class="cno-event py-5">
		<?php if ( has_post_thumbnail() ) : ?>
		<div class="cno-event__image"><?php the_post_thumbnail(); ?></div>
		<?php endif; ?>
		<h1 class="cno-event__title headline" <?php echo ( has_post_thumbnail() ) ? '' : "style='grid-row:1/2;'"; ?>> <?php the_title(); ?></h1>
		<div class="sidebar">
			<aside class="cno-event-meta">
				<div class="cno-event-meta__container">
					<?php extract( get_field( 'info' ) ); ?>
					<div class="cno-event-meta__day">
						<strong>When: </strong><?php echo $day . ', ' . cno_get_the_date( $day ); ?>
					</div>
					<div class="cno-event-meta__start-time">
						<strong>Start Time:</strong> <?php echo $start_time; ?>
					</div>
					<?php
					if ( ! empty( $end_time ) ) :
						?>
					<div class="event-meta__start-time">
						<strong>End Time: </strong><?php echo $end_time; ?>
					</div>
					<?php endif; ?>
				</div>
				<div class="sidebar__buttons cno-event__buttons">
					<button class="btn__fill--secondary" data-add-to-schedule='true' data-id="<?php echo get_the_ID(); ?>" data-post-type="<?php echo $post->post_type; ?>">Add to
						Schedule
					</button>
					<div class="sidebar__confirmation cno-event-schedule-confirmation"></div>
					<button class="btn__outline--secondary">Share</button>
				</div>
			</aside>
		</div>
		<section class="cno-event__about" <?php echo ( has_post_thumbnail() ) ? '' : "style='grid-row:2/3;'"; ?>>
			<?php echo get_field( 'description' ); ?>
		</section>
	</article>
</div>
<?php
get_footer();