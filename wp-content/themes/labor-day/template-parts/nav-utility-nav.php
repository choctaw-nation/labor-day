<?php
/**
 * Utility Nav
 *
 * @package ChoctawNation
 */

if ( ! get_field( 'enable_utility_nav', 'options' ) || ! have_rows( 'nav_items', 'options' ) ) {
	return;
}

$row_classes   = array( 'row', 'row-cols-auto', 'list-unstyled', 'mb-0', 'gx-0', 'gap-2', 'align-items-center' );
$row_classes[] = 'justify-content-' . get_field( 'link_alignment', 'options' );
?>
<nav class="container-fluid bg-tertiary py-2">
	<ul class="<?php echo esc_attr( implode( ' ', $row_classes ) ); ?>">
		<?php
		while ( have_rows( 'nav_items', 'options' ) ) {
			the_row();
			$label  = esc_textarea( get_sub_field( 'nav_item_label' ) );
			$href   = esc_url( get_sub_field( 'nav_item_url' ) );
			$target = get_sub_field( 'new_window' ) ? '_blank' : '_self';
			echo "<li><a href='{$href}' class='text-primary-dark fs-6 link-offset-1-hover' target='{$target}'>{$label}</a></li>";
		}
		?>
	</ul>
</nav>