<?php
/**
 * Text callout
 *
 * @package ChoctawNation
 */

extract( $args );
$bg_color = 'primary' === $color ? 'text-bg-primary-light' : 'text-bg-secondary';
?>
<aside class="<?php echo "{$bg_color} position-relative overflow-hidden py-5 text-callout"; ?>">
	<div class="bg position-absolute top-0 w-100 h-100 opacity-50" style="background-image:url('<?php echo get_theme_file_uri( '/images/gradient_texture.jpg' ); ?>')"></div>
	<?php
	echo "<div class='opacity-50 z-1 position-absolute top-0 w-100 h-100'></div>";
	?>
	<div class="container position-relative z-2">
		<div class="row justify-content-center">
			<div class="col-auto">
				<?php if ( 'history' === $post->post_name ) : ?>
				<figure class="mb-0 align-self-center">
					<?php echo file_get_contents( 'wp-content/themes/labor-day/images/faith-family-culture.svg' ); // phpcs:ignore ?>
				</figure>
				<?php else : ?>
				<div class='text-content d-flex flex-column row-gap-4 align-items-stretch text-white fs-2'>
					<blockquote class="fw-medium fs-1 mb-0">“The festival gives us an opportunity to fellowship, share stories and come together as a tribe.”</blockquote>
					<cite class="d-block align-self-end fw-normal fst-normal">&mdash; Chief Gary Batton</cite>
				</div>
				<?php endif; ?>
			</div>
		</div>
</aside>