# Quick Start

Run the following commands

1. `cd wp-content/themes/labor-day` to get to the theme root
2. `npm install`
3. `composer install`
4. `npm run start`

[View the template repo changelog here.](/CHANGELOG.md)

## Tests

Tests should be added in `labor-day/tests` and must be included in the [`phpunit.xml.dist`](wp-content/themes/labor-day/phpunit.xml.dist) `<testsuites>` list. **Note:** Files that contain tests should start with the `test-` prefix and follow the pattern laid out in `test-sample.php`. For more information, [check out the docs.](https://make.wordpress.org/core/handbook/testing/automated-testing/phpunit/)

```xml
<testsuites>
    <testsuite name="sample">
        <directory prefix="test-" suffix=".php">tests/</directory>
    </testsuite>
</testsuites>
```
