<?php
/**
 * Text callout
 */

extract( $args );
?>
<aside class="<?php echo "text-callout--{$color}"; ?>">
	<div class="bg" style="background-image:url('<?php echo get_theme_file_uri( '/images/white-gradient_texture.png' ); ?>')"></div>
	<?php
	echo "<div class='overlay--{$color}'></div>";
	?>
	<div class="container">
		<div class="row">
			<div class="col text-callout__content">
				<?php if ( 'history' === $post->post_name ) : ?>
				<figure>
					<?php echo file_get_contents('wp-content/themes/labor-day/images/faith-family-culture.svg'); ?>
				</figure>
				<?php else : ?>
				<div class='text-content'>
					<span class="quote">“The festival gives us an opportunity to fellowship, share stories and come together as a tribe.”</span>
					<span class="quote--attribution">&mdash; Chief Gary Batton</span>
				</div>
				<?php endif; ?>
			</div>
		</div>
</aside>