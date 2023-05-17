<?php
/**
 * Sets up the initial ACF field the way `class-content-sections` expects it for the `hero_section()` method.
 *
 * @since 1.0
 * @author KJ Roelke
 */

if ( function_exists( 'acf_add_local_field_group' ) ) :

	/**
	 * Global Page Options
	 * Field: Section 1 (Hero) Fields
	 * name: 'hero'
	 * Subfields?: true
	 * Subfields_List: array(
	 *   'subheadline'          => Subheadline,
	 *   'has_background_image' => boolean,
	 *   'background_image'     => url,
	 *   'has_cta'              => boolean,
	 *   'cta_link'             => url,
	 *   'cta_text'             => button text
	 * )
	 * Show In Rest?: False
	 */
	acf_add_local_field_group(
		array(
			'key'                   => 'group_6423001144e71',
			'title'                 => 'Global Page Options',
			'fields'                => array(
				array(
					'key'               => 'field_63e674b076c37',
					'label'             => 'Section 1 (Hero)',
					'name'              => 'hero',
					'aria-label'        => '',
					'type'              => 'group',
					'instructions'      => '',
					'required'          => 0,
					'conditional_logic' => 0,
					'wrapper'           => array(
						'width' => '',
						'class' => '',
						'id'    => '',
					),
					'layout'            => 'block',
					'sub_fields'        => array(
						array(
							'key'               => 'field_63e674db76c39',
							'label'             => 'Subheadline',
							'name'              => 'subheadline',
							'aria-label'        => '',
							'type'              => 'textarea',
							'instructions'      => '',
							'required'          => 0,
							'conditional_logic' => 0,
							'wrapper'           => array(
								'width' => '',
								'class' => '',
								'id'    => '',
							),
							'default_value'     => 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum.',
							'maxlength'         => '',
							'placeholder'       => '',
							'prepend'           => '',
							'append'            => '',
						),
						array(
							'key'               => 'field_63e674ea76c3a',
							'label'             => 'Enable Section Background Image?',
							'name'              => 'has_background_image',
							'aria-label'        => '',
							'type'              => 'true_false',
							'instructions'      => '',
							'required'          => 0,
							'conditional_logic' => 0,
							'wrapper'           => array(
								'width' => '',
								'class' => '',
								'id'    => '',
							),
							'message'           => 'Check to add background image',
							'default_value'     => 0,
							'ui'                => 0,
							'ui_on_text'        => '',
							'ui_off_text'       => '',
						),
						array(
							'key'               => 'field_63e6751b76c3b',
							'label'             => 'Background Image',
							'name'              => 'background_image',
							'aria-label'        => '',
							'type'              => 'image',
							'instructions'      => '',
							'required'          => 0,
							'conditional_logic' => array(
								array(
									array(
										'field'    => 'field_63e674ea76c3a',
										'operator' => '==',
										'value'    => '1',
									),
								),
							),
							'wrapper'           => array(
								'width' => '',
								'class' => '',
								'id'    => '',
							),
							'return_format'     => 'url',
							'library'           => 'all',
							'min_width'         => '',
							'min_height'        => '',
							'min_size'          => '',
							'max_width'         => '',
							'max_height'        => '',
							'max_size'          => '',
							'mime_types'        => '',
							'preview_size'      => 'medium',
						),
						array(
							'key'               => 'field_63e676137dce1',
							'label'             => 'Enable Call-to-Action Button?',
							'name'              => 'has_cta',
							'aria-label'        => '',
							'type'              => 'true_false',
							'instructions'      => '',
							'required'          => 0,
							'conditional_logic' => 0,
							'wrapper'           => array(
								'width' => '',
								'class' => '',
								'id'    => '',
							),
							'message'           => 'Check to enable CTA button in Hero section',
							'default_value'     => 0,
							'ui'                => 0,
							'ui_on_text'        => '',
							'ui_off_text'       => '',
						),
						array(
							'key'               => 'field_63e675c061464',
							'label'             => 'CTA URL',
							'name'              => 'cta_link',
							'aria-label'        => '',
							'type'              => 'url',
							'instructions'      => 'Place the URL here (all urls must start with https://)',
							'required'          => 0,
							'conditional_logic' => array(
								array(
									array(
										'field'    => 'field_63e676137dce1',
										'operator' => '==',
										'value'    => '1',
									),
								),
							),
							'wrapper'           => array(
								'width' => '',
								'class' => '',
								'id'    => '',
							),
							'default_value'     => '',
							'placeholder'       => 'https://careers.choctawnation.com/....',
						),
						array(
							'key'               => 'field_63e6764d7dce2',
							'label'             => 'CTA Label',
							'name'              => 'cta_text',
							'aria-label'        => '',
							'type'              => 'text',
							'instructions'      => 'The CTA Button\'s Label (default: "Apply Now")',
							'required'          => 0,
							'conditional_logic' => array(
								array(
									array(
										'field'    => 'field_63e676137dce1',
										'operator' => '==',
										'value'    => '1',
									),
								),
							),
							'wrapper'           => array(
								'width' => '',
								'class' => '',
								'id'    => '',
							),
							'default_value'     => 'Apply Now',
							'maxlength'         => '',
							'placeholder'       => '',
							'prepend'           => '',
							'append'            => '',
						),
					),
				),
			),
			'location'              => array(
				array(
					array(
						'param'    => 'post_type',
						'operator' => '==',
						'value'    => 'page',
					),
				),
			),
			'menu_order'            => 0,
			'position'              => 'normal',
			'style'                 => 'seamless',
			'label_placement'       => 'top',
			'instruction_placement' => 'label',
			'hide_on_screen'        => '',
			'active'                => true,
			'description'           => '',
			'show_in_rest'          => 0,
		)
	);

endif;