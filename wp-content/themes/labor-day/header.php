<?php

/**
 * Basic Header Template
 * 
 */
wp_head();
?>

<!DOCTYPE html>
<html lang="<? bloginfo('language') ?>">

<head>
    <meta charset="<? bloginfo('charset'); ?>">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>
        <? echo get_bloginfo('name') . " | " . get_bloginfo('description'); ?>
    </title>
</head>

<body <? body_class() ?>>
    <header class="d-flex py-4" id="site-header">
        <div class="navbar container-fluid gx-5 d-flex justify-content-between">
            <a href="<? esc_url(site_url()) ?>" class="logo" aria-label="to Home Page">
                <figure class="logo-image d-inline-block">
                    <h1>
                        <? echo bloginfo('name'); ?>
                    </h1>
                </figure>
            </a>
            <? wp_nav_menu(
                array(
                    'theme-location' => 'primary_menu',
                    'menu_class' => 'navbar__menu p-0 m-0 d-inline-flex',
                    'container' => 'nav',
                    'container_class' => 'navbar d-flex align-items-center',
                )
            );
            ?>
        </div>
    </header>