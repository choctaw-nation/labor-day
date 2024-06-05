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
<li class="registration-form-list__item my-5">
	<div class="registration-form row justify-content-between">
		<div class="col-lg-4">
			<figure class="two-col__media--container ratio ratio-16x9 mb-0">
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
			<h3 class="fs-2 text-capitalize">
				<?php the_title(); ?>
			</h3>
			<p class="fs-6 mb-5"><?php $hero->the_subheadline(); ?></p>
			<?php
			$pace_link_visible = get_field( 'pace_link_visibility' );
			if ( $pace_link_visible ) {
				$pace_link = get_field( 'pace_registration_link' );
				echo '<div class="mt-auto d-flex flex-wrap gap-2">';
				echo "<a href='{$pace_link['url']}' class='fs-6 btn btn-secondary mt-auto align-self-start text-center' target='_blank' rel='noopener noreferrer'>{$pace_link['title']}</a>";
			}
			$has_external_registration_link = get_field( 'has_external_registration_link' );
			$cta_link                       = $has_external_registration_link ? get_field( 'external_registration_link' ) : get_the_permalink();
			echo "<a href='{$cta_link}' class='fs-6 btn btn-primary mt-auto align-self-start text-center'>Apply Now</a>";
			if ( $pace_link_visible ) {
				echo '</div>';
			}
			?>
		</div>
	</div>
</li>