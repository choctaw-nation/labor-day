<?php
/**
 * Single: Entertainment Post Type Output
 */

extract( get_field( 'info' ) );
$date = cno_get_the_date( $day );
?>
<section>
	<div class="row">
		<div class="col">
			<?php if ( has_post_thumbnail() ) : ?>
			<figure class="featured-image"><?php the_post_thumbnail( 'large' ); ?></figure>
			<?php endif; ?>
		</div>
	</div>
	<div class="row">
		<div class="col">
			<?php the_title( "<h1 class='headline'>", '</h1>' ); ?>
			<div class="text-content"><?php echo get_field( 'description' ); ?></div>
		</div>
	</div>
	<div class="row">
		<div class="col">
			<h2 class="headline">Info</h2>
			<div class="meta">
				<div class="meta__date"><strong>Date: </strong><?php echo "{$day}, {$date}"; ?></div>
				<div class="meta__time"><strong>Time: </strong>
					<?php echo $start_time; ?>
					<?php
					if ( ! empty( $end_time ) ) {
						echo " &ndash; {$end_time}";}
					?>
				</div>
				<div class="meta__location"><strong>Location: </strong><a href="#">Ampitheatre</a></div>
			</div>
		</div>
	</div>
</section>
