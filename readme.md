# Project Overview

Labor Day is an event held by the Choctaw Nation Tribal Events team. This is a time for family, fellowship, and celebrating the Choctaw Nation Culture. This year it will be Friday, August 31st to Sunday September 4th. This website will be to use to store everything, past, present and future of the Labor Day Event.

# Changelog

## v4.0.2

-   Fix overflow and responsive issues
-   Prefer `gap` over `margin` for spacing

## v4.0.1

-   Add `d-block` to hero images

## v4.0.0

-   Update CSS to use Bootstrap instead of custom css

## v3.3.7

-   Bring up compat with WP 6.7.1
-   Update npm packages
-   Eagerly load hero images and hide them from screen readers

## v3.3.6

-   added alt base map image and miscellaneous image.

## v3.3.5

-   Update npm & composer packages
-   Update Theme Header to set minimum WordPress version
-   Update Github Actions

## v3.3.4

-   added alt text to the images.

## v3.3.3

-   update package.json to fix security issues
-   fix misspelling in footer "Tushkahomma" to "Tuskahomma"

## v3.3.1

-   Update the events rest route to return both the `brief_description` and the `description` fields set with ACF
-   Update Event cards to display `learn more` button _only_ if the event has its description field filled out. The preview still uses the new `brief_description` field (previously named `description`).
-   Minor bug fixes

## v3.3.0

-   Added new ACF field for 5k PACE registration link & control

## v3.2.4

-   Added CI/CD for staging env
-   Updated packages
-   Added Google reCaptcha in appropriate places (so Gravity Forms reCaptcha can be disabled).

## v3.2.3

-   Updated homepage events template to add links to events on images and titles
-   Added CI/CD
-   Removed `/dist` folder from Github

## v3.2.2

-   Fixed a bug where `archive-events` wasn't loading the footer image correctly
-   Updated the footer image to use `srcset` and lazy loading with a simpler WordPress function
-   Updated the custom REST route to use a `base_args` array and only retrieved published posts

## v3.2.1

-   Better server-side searching when loading `/events` with a search param (powered by Relevanssi)
-   Added extra REST route to handle search params
-   Overload the template to force search to use `archive-events`
-   fix JS search errors
-   Bump npm package dependencies' versions

## v3.2.0

-   Added a new rest route to get a single event
-   Added caching to the REST route so it's a little more performant.
-   Fixed some type errors when adding events to schedule

## v3.1.1

-   Fix hero image bug

## v3.1.0

-   Added Options pages as ACF Fields
    -   Added ACF JSON file for options pages
-   Enabled Operational Hours Visibility Toggle
-   Updated React to handle operational hours visibility
-   Better wpcs conformity

## v3.0.1

-   Re-enable "add to calendar" functionality on `single-events`
-   Also hide operation hours

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
