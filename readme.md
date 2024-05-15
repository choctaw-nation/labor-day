# Project Overview

Labor Day is an event held by the Choctaw Nation Tribal Events team. This is a time for family, fellowship, and celebrating the Choctaw Nation Culture. This year it will be Friday, August 31st to Sunday September 4th. This website will be to use to store everything, past, present and future of the Labor Day Event.

# Changelog

## v3.0.0

-   Remove the CNO Events plugin and add functionality natively to the theme.

## v2.2.1

-   Sorted homepage featured events by date _and_ time.

## v2.2.0

-   Added toggles to control homepage events and registrations sections' visibility
-   Added an ACF Field to add featured events to homepage
-   Fixed a bug where time meridiems were appearing in duplicate on the `/events` page

## v2.1.4

-   Fixed a bug where list wasn't showing on `/registrations` page.

## v2.1.3

-   Fixed a bug where the "Share" modal wasn't working on the `/my-schedule` page.
-   Reduced custom CSS

## v2.1.2

-   Fixed `event_location` taxonomy not appearing (had to manually flush permalinks)
-   Refactored `Theme_Init` and `CNO Events` plugin to load taxonomies within the plugin (instead of in the theme) and added extra deactivation methods
-   Updated `taxonomy-event_location.php` to look better
-   Updated the `LocationButton` component to link to the location taxonomy page
-   Updatedd `RemoveEvent` component to be red

## v2.1.1

-   Updated `header.php` to only call in 1 Menu
-   Removed deprecated "Mobile Menu" from theme
-   Removed JS `mouseover` event in favor of CSS `:hover` styles for dropdown
-   Replaced old `Nav_Walker` in favor of theme-compliant `Navwalker` that uses `dropdown-toggle` for dropdown elements.
-   Updated header styles to use more Bootstrap customization and less custom css
-   Added `mix-blend-mode:multiply` on front-page hero overlay

## v2.1.0

-   Rewrote the events plugin to use custom rest route instead of relying on WPGraphQL
-   Updated Event Post Buttons to be semantic `button` elements instead of improper `a` elements
-   Reduced custom CSS in favor of modifying Bootstrap's compiled CSS + utility classes

## v2.0.3

-   Bug fixes
-   Prep homepage for 2024

## v2.0.1

-   Rebuild theme to conform more closely with the CNO Template theme.

## v1.11

-   Update & hollow out site in prep for 2024

## v1.10.1

-   Fixed bug that caused page styles not to load when using `cno_enqueue_page` functions
-   Fixed bug that broke the 'Tribal Police" icon on the map

## v1.10.0

-   Updated JS enqueue to be loaded in the footer again (albeit with WP 6.3 $args array)
-   Updated the map again and refactored into a class so the `page-map.php` file is a simpler html file
-   Switched some JS for TS files for clearer edge-case bug squashing

## v1.9.14

-   Added Location to Map
-   Updated the Enqueue Scripts to use generated Asset files (instead of file modification timestamp).

## v1.9.13

-   Init Changelog!
-   Update Swiper to v10 and clean up code
-   Update WordPress to v6.3
-   Test site with PHP v8.2
