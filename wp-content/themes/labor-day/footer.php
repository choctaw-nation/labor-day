<?php

/**
 * Basic Footer Template
 * 
 * @since 1.0
 * 
 */
global $SITE_LOGO;
$current_year = date("Y");
?>
<aside class="footer-callout">
    <div class="container">
        <div class="row">
            <div class="col footer-callout__image">Image</div>
            <div class="col footer-callout__text">
                <div class="h4 headline">Choctaw Nation Capitol Grounds</div>
                <div class="subheadline">Council House Rd</div>
                <div class="subheadline">Tushkahoma, OK 74574</div>
                <a href="#" class="btn__fill--primary">Get Directions</a>
            </div>
        </div>
    </div>
</aside>
<footer class="footer text-white">
    <div class="container my-5 text-center">
        <div class="row">
            <div class="col"><a href="<?php esc_url(site_url()) ?>" class="logo">
                    <figure class="logo-image d-inline-block">
                        <?php echo $SITE_LOGO; ?>
                        <span aria-label="to Home Page">
                            <?php echo bloginfo('name') ?>
                        </span>
                    </figure>
                </a></div>
            <div class="col">Nav</div>
            <div class="col">Socials</div>
        </div>
    </div>
    <div id="copyright" class="py-5 text-center">
        <?php echo "&copy;&nbsp; {$current_year} Choctaw Nation of Oklahoma. All Rights Reserved."; ?>
    </div>
</footer>
<? wp_footer(); ?>
</body>

</html>