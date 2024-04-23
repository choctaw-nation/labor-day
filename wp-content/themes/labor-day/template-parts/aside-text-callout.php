<?php
/**
 * Text callout
 *
 * @package ChoctawNation
 */

extract( $args );
?>
<aside class="<?php echo "text-callout--{$color} position-relative overflow-hidden"; ?>">
	<div class="bg position-absolute top-0 w-100 h-100" style="background-image:url('<?php echo get_theme_file_uri( '/images/gradient_texture.jpg' ); ?>')"></div>
	<?php
	echo "<div class='overlay--{$color} opacity-50 z-1 position-absolute top-0 w-100'></div>";
	?>
	<div class="container">
		<div class="row">
			<div class="col text-callout__content position-relative text-white z-3">
				<?php if ( 'history' === $post->post_name ) : ?>
				<figure>
					<?php echo file_get_contents( 'wp-content/themes/labor-day/images/faith-family-culture.svg' ); ?>
				</figure>
				<?php else : ?>
				<div class='text-content d-flex flex-column align-items-center text-white fs-2'>
					<span class="quote fw-medium fs-1">“The festival gives us an opportunity to fellowship, share stories and come together as a tribe.”</span>
					<span class="quote--attribution mt-4 ms-auto fw-normal">&mdash; Chief Gary Batton</span>
				</div>
				<?php endif; ?>
			</div>
		</div>
</aside>