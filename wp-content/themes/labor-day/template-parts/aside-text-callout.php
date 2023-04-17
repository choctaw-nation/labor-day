<?php

/**
 * Text callout
 * 
 */
// var_dump($args);

global $post;
// var_dump($post);
extract($args);
?>
<aside class="<?php echo "text-callout--{$color}"; ?>">
	<div class="bg" style="background-image:url('<?php echo get_theme_file_uri('/images/white-gradient_texture.png'); ?>')"></div>
	<?php echo "<div class='overlay--{$color}'></div>";
	?>
	<div class="container">
		<div class="row">
			<div class="col text-callout__content">
				<?php if ('history' === $post->post_name) : ?>
					<figure>
						<?php global $NATION_VALUES_SVG; ?>
						<?php echo $NATION_VALUES_SVG; ?>
					</figure>
				<?php else : ?>
					<div class='text-content'>Some HTML should be dynamically injected here.</h2>
					</div>
				<?php endif; ?>
			</div>
		</div>


</aside>