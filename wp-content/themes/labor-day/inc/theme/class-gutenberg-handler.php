<?php
/**
 * Gutenberg Handler
 * Handles the Controls and Settings for the Block Editor
 *
 * @package ChoctawNation
 */

namespace ChoctawNation;

use WP_Block_Editor_Context;

/**
 * Gutenberg Handler
 */
class Gutenberg_Handler {
	/**
	 * Constructor
	 */
	public function __construct() {
		add_action( 'enqueue_block_editor_assets', array( $this, 'enqueue_block_assets' ) );
		add_action( 'after_setup_theme', array( $this, 'cno_block_theme_support' ), 50 );
		add_filter( 'block_editor_settings_all', array( $this, 'restrict_gutenberg_ui' ), 10, 1 );
		add_filter( 'allowed_block_types_all', array( $this, 'restrict_block_types' ), 10, 2 );
		add_filter( 'use_block_editor_for_post_type', array( $this, 'handle_page_templates' ), 20, 2 );
	}

	/**
	 * Check if the current user is an administrator.
	 *
	 * @return bool
	 */
	private function is_admin(): bool {
		return current_user_can( 'activate_plugins' );
	}

	/**
	 * Enqueue the block editor assets that control the layout of the Block Editor.
	 */
	public function enqueue_block_assets() {
		wp_enqueue_style(
			'typekit',
			'https://use.typekit.net/jky5sek.css',
			array(),
		null // phpcs:ignore
		);
		new Asset_Loader( 'editDefaultBlocks', Enqueue_Type::script, 'admin', array() );
		new Asset_Loader( 'mediapressCustomFilters', Enqueue_Type::script, 'admin', array() );
	}

	/**
	 * Init theme supports specific to the block editor.
	 */
	public function cno_block_theme_support() {
		$opt_in_features = array(
			'responsive-embeds',
			'editor-styles',
		);
		foreach ( $opt_in_features as $feature ) {
			add_theme_support( $feature );
		}
		$opt_out_features = array(
			'core-block-patterns',
		);
		foreach ( $opt_out_features as $feature ) {
			remove_theme_support( $feature );
		}
	}

	/**
	 * Restrict access to the locking UI to Administrators.
	 *
	 * @param array $settings Default editor settings.
	 */
	public function restrict_gutenberg_ui( $settings, ) {
		$is_administrator = $this->is_admin();

		if ( ! $is_administrator ) {
			$settings['canLockBlocks']      = false;
			$settings['codeEditingEnabled'] = false;
		}

		return $settings;
	}

	/**
	 * Filters the list of allowed block types in the block editor.
	 *
	 * This function restricts the available block types to Heading, List, Image, and Paragraph only.
	 *
	 * @param array|bool              $allowed_block_types Array of block type slugs, or boolean to enable/disable all.
	 * @param WP_Block_Editor_Context $context               The block editor context
	 *
	 * @return array|bool The array of allowed block types or boolean to enable/disable all.
	 */
	public function restrict_block_types( array|bool $allowed_block_types, WP_Block_Editor_Context $context ): array|bool {
		// Get all registered blocks if $allowed_block_types is not already set.
		if ( ! is_array( $allowed_block_types ) || empty( $allowed_block_types ) ) {
			$registered_blocks   = \WP_Block_Type_Registry::get_instance()->get_all_registered();
			$allowed_block_types = array_keys( $registered_blocks );
		}

		if ( ! $this->is_admin() ) {
			$disallowed_blocks = array(
				'core/archives',
				'core/avatar',
				'core/calendar',
				'core/categories',
				'core/comments',
				'core/comment-author-name',
				'core/comment-content',
				'core/comment-date',
				'core/comment-edit-link',
				'core/comment-reply-link',
				'core/comment-template',
				'core/comment-pagination-previous',
				'core/comments-author-avatar',
				'core/comments-pagination',
				'core/comments-pagination-next',
				'core/comments-pagination-numbers',
				'core/comments-title',
				'core/home-link',
				'core/file',
				'core/latest-comments',
				'core/latest-posts',
				'core/loginout',
				'core/missing',
				'core/media-text',
				'core/navigation',
				'core/navigation-link',
				'core/navigation-submenu',
				'core/nextpage',
				'core/page-list-item',
				'core/page-list',
				'core/post-author',
				'core/post-author-biography',
				'core/post-author-name',
				'core/post-comment',
				'core/post-comments',
				'core/post-comments-count',
				'core/post-comments-form',
				'core/post-comments-link',
				'core/post-date',
				'core/post-navigation-link',
				'core/post-terms',
				'core/rss',
				'core/search',
				'core/site-logo',
				'core/site-tagline',
				'core/site-title',
				'core/social-link',
				'core/social-links',
				'core/tag-cloud',
				'core/term-description',
				'core/video',
			);
			return array_filter(
				$allowed_block_types,
				function ( $block ) use ( $disallowed_blocks ) {
					return ! in_array( $block, $disallowed_blocks, true );
				}
			);
		}
		return $allowed_block_types;
	}

	/**
	 * Disallows the Block Editor (and editor altogether) for certain post types
	 *
	 * @param bool   $use_block_editor Whether to use the block editor.
	 * @param string $post_type The post type being checked.
	 * @return bool
	 */
	public function handle_page_templates( bool $use_block_editor, string $post_type, ): bool {
		if ( ! is_admin() ) {
			return $use_block_editor;
		}
		$disallowed_post_types = array( 'staff', 'opinion' );
		if ( in_array( $post_type, $disallowed_post_types, true ) ) {
			return false;
		}
		global $post;
		if ( ! $post ) {
			return $use_block_editor;
		}
		$current_template     = get_page_template_slug( $post );
		$homepage_id          = (int) get_option( 'page_on_front' );
		$is_homepage          = ( $homepage_id && $homepage_id === $post->ID );
		$disallowed_templates = array( 'templates/map.php', 'templates/my-schedule.php' );
		if ( in_array( $current_template, $disallowed_templates, true ) ) {
			// could also use $is_homepage check here if needed
			return false;
		}
		return $use_block_editor;
	}
}
