<?php

/**
 * Basic Footer Template
 * 
 * @since 1.0
 * 
 */

$current_year = date("Y");
?>
<footer class="footer bg-primary py-5 container-fluid gx-5 text-white text-center">
    <a href="<?php esc_url(site_url()) ?>" class="logo">
        <figure class="logo-img d-inline-block">
            <span aria-label="to Home Page">
                <?php echo bloginfo('name') ?>
            </span>
        </figure>
    </a>
    <div id="copyright">
        <?php echo "&copy;&nbsp; {$current_year} Choctaw Nation of Oklahoma. All Rights Reserved."; ?>
    </div>
</footer>
<? wp_footer(); ?>
</body>

</html>