<?php
/**
 * Registration Sub-Page Preview Card
 *
 * @package ChoctawNation
 * @since 2.0
 */

use ChoctawNation\ACF\Hero;
use ChoctawNation\Content\Sections;

$content = new Sections();
$hero    = new Hero( $post->ID, get_field( 'hero' ) );
?>
<li class="registration-form-list__item">
	<div class="registration-form row justify-content-between">
		<div class="col-lg-4">
			<figure class="two-col__media--container ratio ratio-16x9">
				<?php
				the_post_thumbnail(
					'large',
					array(
						'class'    => 'h-100 w-100 object-fit-cover',
						'data-aos' => 'fade-right',
						'loading'  => 'lazy',
					)
				);
				?>
			</figure>
		</div>
		<div class="col-lg-8 d-flex flex-column">
			<h3 class="h2 text-capitalize">
				<?php the_title(); ?>
			</h3>
			<p><?php $hero->the_subheadline(); ?></p>
			<?php
			$has_external_registration_link = get_field( 'has_external_registration_link' );
			$cta_link                       = $has_external_registration_link ? get_field( 'external_registration_link' ) : get_the_permalink();
			echo "<a href='{$cta_link}' class='btn__fill--primary mt-auto w-25 text-center'>Apply Now</a>";
			?>
		</div>
	</div>
</li>