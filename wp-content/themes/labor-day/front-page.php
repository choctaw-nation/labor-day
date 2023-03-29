<?php

/**
 * Homepage Template
 * 
 * @author KJ Roelke
 * @since 1.0
 */

$content = new ContentSectionComponents();
// $hero_fields = get_field('hero');

get_header(); ?>
<main class="site-content">
    <?php $content->hero_section($post->ID); ?>
    <section class="about py-5 bg-dark text-white">
        <div class="container">
            <div class="row">
                <div class="col">
                    <?php
                    extract(get_field('section_2'));
                    $args = array(
                        'subheadline_element' => 'p',
                        'subheadline_content' => $subheadline,
                        'subheadline_class' => 'subheadline text-content',
                    );
                    $content->headline($headline, true, $args); ?>
                </div>
            </div>
            <div class="row">
                <div class="col">
                    <ul class="job-categories">
                        <li class="job-categories__category">Job 1</li>
                        <li class="job-categories__category">Job 2</li>
                        <li class="job-categories__category">Job 3</li>
                        <li class="job-categories__category">Job 4</li>
                        <li class="job-categories__category">Job 5</li>
                    </ul>
                </div>
            </div>
        </div>
    </section>
    <aside class="jobs-callout py-5">
        <div class="container">
            <div class="row">
                <h2 class="headline">New and Now Jobs</h2>
            </div>
            <div class="row">
                <div class="col-4">Job #1</div>
                <div class="col-4">Job #2</div>
                <div class="col-4">
                    Job #3
                </div>
            </div>
        </div>
    </aside>
    <section class="job-opportunities py-5">
        <div class="container">
            <?php
            extract(get_field('section_4'));
            $content->two_col_text_and_media($headline, $text_content, $button['button_text'], $button['button_link'], true, array('image_src' => $photo)); ?></div>
    </section>
    <section class="find-your-place py-5 position-relative bg-dark text-white">
        <div class="section-bg-img container-fluid w-100 h-100 position-absolute"></div>
        <div class="container">
            <?php
            extract(get_field('section_5'));
            $content->two_col_text_and_media($headline, $text_content, $button['button_text'], $button['button_link'], true, array('reverse' => true)); ?>
        </div>
    </section>
    <section class="stories py-5">
        <div class="container">
            <div class="row">
                <?php $content->headline("Associate Stories"); ?>
            </div>
            <div class="row">
                <div class="col-4">Job #1</div>
                <div class="col-4">Job #2</div>
                <div class="col-4">
                    Job #3
                </div>
            </div>
            <div class="row">
                <div class="col-2"><?php $content->cta_button(text: "See More Stories", link: '#') ?></div>
            </div>
        </div>
    </section>
    <section class="image-grid py-5">
        <div class="container">
            <div class="row">
                <div class="col-2">
                    <p>Image</p>
                </div>
                <div class="col-2">
                    <p>Image</p>
                </div>
                <div class="col-2">
                    <p>Image</p>
                </div>
                <div class="col-2">
                    <p>Image</p>
                </div>
                <div class="col-2">
                    <p>Image</p>
                </div>
                <div class="col-2">
                    <p>Image</p>
                </div>
            </div>
            <div class="row">
                <div class="col-2">
                    <p>Image</p>
                </div>
                <div class="col-2">
                    <p>Image</p>
                </div>
                <div class="col-2">
                    <p>Image</p>
                </div>
                <div class="col-2">
                    <p>Image</p>
                </div>
                <div class="col-2">
                    <p>Image</p>
                </div>
                <div class="col-2">
                    <p>Image</p>
                </div>
            </div>
            <div class="row">
                <div class="col-2">
                    <p>Image</p>
                </div>
                <div class="col-2">
                    <p>Image</p>
                </div>
                <div class="col-2">
                    <p>Image</p>
                </div>
                <div class="col-2">
                    <p>Image</p>
                </div>
                <div class="col-2">
                    <p>Image</p>
                </div>
                <div class="col-2">
                    <p>image</p>
                </div>
            </div>
        </div>
    </section>
</main>
<?php get_footer(); ?>