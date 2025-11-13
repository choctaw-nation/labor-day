<?php
/**
 * Generic Page Template
 *
 * @package ChoctawNation
 */

get_header();
?>
<main <?php post_class( 'site-content' ); ?>>
<?php the_content(); ?>
</main>
<?php
get_footer();
