<?php

/**
 * A Component Class that displays content a few different ways. All methods have an $args bypass and an $echo control where `false` returns the markup and `true` echoes the markup. The $args array also shows expected parameters.
 * 
 * @param bool $acf class-wide control to use acf fields or standard Wordpress field lookups (e.g. `get_field` vs `get_the_excerpt`). If true, excerpt will be set with `get_field('archive_content',$id)`. Defaults `true`
 * 
 * @author KJ Roelke
 * @version 1.0.0
 */


class ContentSectionComponents {
    private bool $acf = true;
    function __construct(bool $acf = true) {
        $this->acf = $acf;
    }

    private function print_error(string $message, bool $return = true) {
        if ($return) {
            return "<span class='d-block' style='padding:4em;background-color:darkred;color:white;'>Error: {$message}</span>";
        } else print_r("<span class='d-block' style='padding:4em;background-color:darkred;color:white;'>Error: {$message}</span>", $return);
    }

    /**
     * A headline element that has lots of optional parameters in the $args array.
     * 
     * @param array $args Pass optional customizations
     * 
     * ```php
     * $args = array(
     * 'headline_element'        => ?string default "h2",
     * 'headline_class'          => ?string default "headline",
     * 'subheadline_element'     => ?string default 'span');
     * 'subheadline_class'       => ?string default 'subheadline');
     * 'subheadline_content'     => ?string the subheadline content,
     * ```
     */
    public function headline(string $headline, bool $echo = true, array ...$args) {
        $default = array(
            'headline_element'       => 'h2',
            'headline_class'         => 'headline',
            'subheadline_element'    => 'span',
            'subheadline_class'      => 'subheadline',
        );

        $options = array_merge($default, ...$args);
        extract($options);

        $markup = "<{$headline_element} class='{$headline_class}'>{$headline}</{$headline_element}>";
        if (!empty($subheadline_content)) $markup .= "<{$subheadline_element} class='{$subheadline_class}'>{$subheadline_content}</{$subheadline_element}>";
        if ($echo) {
            echo $markup;
        } else return $markup;
    }

    /**
     *  Generates an `<a>` or `<button>` based on whether or not a $link is passed. Recommended use with named parameters for simple configuration.
     * 
     * @param array $options {
     * 
     *      @var string $text         The button text
     *      @var string $link         The button href
     *      @var string $html_class   btn classes
     *      @var bool $is_external    Is the link external?
     * }
     * @param bool $echo Whether to echo or return the markup (default: true)
     */
    public function cta_button(array $options, bool $echo = true) {
        $default = array(
            'text'          => 'Learn More',
            'link'          => '',
            'html_class'    => 'btn__fill--primary',
            'is_external'   => false,
        );
        $options = array_merge($default, $options);

        extract($options);

        if (empty($link)) {
            $markup = "<button class='{$html_class}'>{$text}</button>";
        } else {
            $markup = ($is_external) ? "<a href='{$link}' target='_blank' rel='noopener noreferrer' class='{$html_class}'>{$text}</a>" : "<a href='{$link}' class='{$html_class}'>{$text}</a>";
        }

        if ($echo) {
            echo $markup;
        } else return $markup;
    }

    /**
     * Gets the Hero `<section>` with class 'hero'. Optional Background Image or color.
     * 
     * @param array $args Expects an associative array: 
     * ```
     * $args = array(
     * 'has_background_image' => bool,
     * 'background_image' => ?string the URL for CSS `background-image`,
     * 'headline' => string,
     * 'subheadline' => ?string,
     * 'has_cta' => bool,
     * 'cta_link' => ?string the url
     * 'cta_text' => string
     * );
     * ```
     */
    public function hero_section(int $post_id = null, $echo = true, array ...$args) {
        if (empty($post_id)) {
            extract($args);
        } else {
            $hero = get_field('hero', $post_id);
            extract($hero);
        }
        $markupStart = $has_background_image ? "<section class='hero w-100 py-5 style='background-image:url('{$background_image}')>" : "<section class='hero w-100 py-5' style='background-color:var(--bs-secondary);'>";
        $markupStart .= "
        <div class='container'>
            <div class='row my-5'>
                <div class='col text-center py-5'>";
        $markupInner =  $this->headline($headline, false, array('headline_element' => 'h1', 'headline_class' => 'hero__headline headline mb-5', 'subheadline_content' => $subheadline, 'subheadline_class' => 'hero__subheadline subheadline'));

        if ($has_cta) $markupInner .= $this->cta_button(array('text' => $cta_text, 'link' => $cta_link, 'html_class' => 'hero__btn btn__primary--fill mt-5'), false,);
        $markupEnd = "</div></div></div></section>";
        $markup = "{$markupStart}{$markupInner}{$markupEnd}";


        if ($echo) {
            echo $markup;
        } else return $markup;
    }


    /**
     * Generate two-column layout with text and media
     *
     * @param array $options {
     *     The options for the two-column layout
     *
     * 
     *     @var string $headline        (required) The headline text
     *     @var string $content         (required) The content text
     *     @var string $content_wrapper The wrapper element for the content (default: 'p')
     *     @var string $content_class   The CSS class for the content (default: 'text-content')
     *     @var string|null $cta_text   The call-to-action button text (optional)
     *     @var string|null $cta_link   The call-to-action button link (optional)
     *     @var string $media_type      The type of media ('photo' or 'video') (default: 'photo')
     *     @var bool $reverse           Whether to reverse the order of columns (default: false)
     *     @var string|null $image_src  The image source URL (only used for 'photo' media_type) (optional)
     * }
     * @param bool $echo Whether to echo or return the markup (default: true)
     *
     * @return string The markup for the two-column layout
     */
    public function two_col_text_and_media(array $options, bool $echo = true) {
        $default = array(
            'split'             => [6, 6],
            'headline'          => '',
            'headline_element'  => 'h2',
            'headline_class'    => 'headline',
            'content'           => '',
            'content_wrapper'   => 'p',
            'content_class'     => 'text-content mb-5',
            'cta_text'          => null,
            'cta_link'          => null,
            'cta_external'      => false,
            'cta_class'         => 'cta__btn btn__fill--primary mt-5 align-self-start',
            'media_type'        => 'photo',
            'reverse'           => false,
            'image_src'         => get_theme_file_uri('/images/placeholder.jpg'),
        );

        $options = array_merge($default, $options);

        extract($options);


        $container_start = $reverse ? '<div class="row flex-row-reverse two-col">' : '<div class="row two-col">';
        $div_end = '</div>';
        $col_start_1 = "<div class='col-lg-{$split[0]} two-col__media'>";
        $col_start_2 = "<div class='col-lg-{$split[1]} two-col__content'>";
        $col_1_content = '';
        if ($media_type === 'photo' && $image_src) {
            $col_1_content = "<figure class='two-col__media--container'>{$image_src}</figure>";
        } else if ($media_type === 'video') {
            $col_1_content = "<figure class='two-col__media--container'>Video!</figure>";
        }
        $headline_args = array(
            "headline_element"      => $headline_element,
            'headline_class'        => $headline_class,
            "subheadline_content"   => $content,
            "subheadline_element"   => $content_wrapper,
            "subheadline_class"     => $content_class
        );
        $col_2_content = $this->headline($headline, false, $headline_args);

        if (!empty($cta_text)) {
            $btn_options = array(
                'text' => $cta_text,
                'link' => $cta_link,
                'is_external' => $cta_external,
                'html_class' => $cta_class
            );
            $col_2_content .= $this->cta_button($btn_options, false);
        }
        $markup = "
        {$container_start}
            {$col_start_1}{$col_1_content}{$div_end}
            {$col_start_2}{$col_2_content}{$div_end}
        {$div_end}";

        if ($echo) {
            echo $markup;
        } else return $markup;
    }

    /**
     * Vertical Card Layout with an image. $args overrides the `headline` settings
     * 
     * @param array $args Expects an associative array: 
     * ```php
     * $headline_args = array(
     * 'headline_element'        => ?string default "h2",
     * 'headline_class'          => ?string default "vertical-card__title",
     * 'subheadline_element'     => ?string default 'p');
     * 'subheadline_class'       => ?string default 'vertical-card__excerpt');
     * 'subheadline_content'     => ?string the subheadline content,
     * ```
     */
    public function vertical_card(string $image_src, string $headline, string $excerpt, bool $echo = true, array ...$args) {
        $headline_args = array(
            'headline_class'         => 'vertical-card__title',
            'subheadline_element'    => 'p',
            'subheadline_class'      => 'vertical-card__excerpt',
            'subheadline_content'    => $excerpt,
        );

        $options = array_merge($headline_args, ...$args);
        extract($options);
        $card_image = "<figure class='vertical-card__image'><img src={$image_src} /></figure>";
        $card_text_content = "<div class='vertical-card__content'>{$this->headline($headline, false,$options)}</div>";
        $markup = "<div class='vertical-card'>{$card_image}{$card_text_content}</div>";
        if ($echo) {
            echo $markup;
        } else return $markup;
    }

    /**
     * Renders a ul/ol of list items
     * 
     * @param array $list_items         an array of strings to become the `<li>`s
     * @param string $item_class        a string to set list item htmlClass
     * @param string $list_type         `ul` | `ol`
     * @param bool $echo                `echo` or `return` the markup
     * 
     */
    public function bulleted_list(array $list_items, string $item_class = '', string $list_type = 'ul', bool $echo = true) {
        $markup = "<{$list_type}>";
        foreach ($list_items as $item) {
            $markup .= empty($item_class) ? "<li>{$item}</li>" : "<li class='{$item_class}'>{$item}</li>";
        }
        $markup .= "</{$list_type}>";
        if ($echo) {
            echo $markup;
        } else return $markup;
    }
}
