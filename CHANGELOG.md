# Changelog

## Next release (2.0.0)

This release simplifies the customisation of a number of global and component-level options. Configuration maps are now merged together when built, allowing for the modification of existing options and addition of new options without having to redefine the entire map. Some of these maps have been renamed to be consistent with other maps.

The following configurations have been updated to work in this way:

- Breakpoints (using `$fs-breakpoints`).
- Colour palette (`$fs-color-palette`). That this variable was previously named `$fs-default-color-palette`. That variable, though still existing, can no longer be overridden via Felafel configuration.
- Spacings (`$fs-spacing`). This was previously named `$fs-spacing-responsive`.
- Font stacks (`$fs-font-stacks`).
- Font sizes (`$fs-font-sizes`). This was previously named `$fs-font-sizes-responsive`.

In addition:

- Added Choice Card component.
- Added configuration option to change the Masthead top border width (`$fs-masthead-border-top-width`).
- Added configuration options to control border-radius on the Testimonial component's speech bubble (`$fs-testimonial-border-radius`) and avatar (`$fs-testimonial-avatar-border-radius`).
- Added configuration options to hide a browser's default controls for input `type`s 'number' (`$fs-input-number-hide-controls`) and 'search' (`$fs-input-search-hide-controls`). Both default to `true` to maintain the default styling from previous versions.
- Added configuration option to define the selection (text highlight) colour (`$fs-selection-color`).
- Abstracted multiple instances of `if` and `fs-contrasting-color` into a new `colors` function: `fs-color-if-set`.
- Refactored Select component, replacing the SVG arrow icon with a HTML/CSS equivalent.
- Refactored `$fs-font-stacks` and associated helpers to use lists instead of strings when passing font stacks.
- Fixed Form Rows within Fieldsets producing a double bottom margin.
- Fixed unprefixed uses of appearance CSS property.
- Fixed `fs-selection-highlight` mixin not being used by the selection core style.
- Fixed selection core style not being behind the `$fs-enable-core-styles` flag.
- Fixed input masks having incorrectly rounded corners if rounded corners is enabled.

## v1.1.1

- Removed unused .npmrc file.

## v1.1.0

- Added Breadcrumbs component.
- Added Card component.
- Added Details component.
- Added Empty component.
- Added File Upload (Drag and Drop) variant.
- Added Fat Footer component.
- Added Hero component.
- Added Pagination component.
- Added Testimonial component.
- Added Button variant: `[data-appearance="link"]`.
- Added `fs-color` function to grab colours from `$fs-default-colour-palette` without referencing it directly.
- Modified Primary Navigation styling.
- Fixed font family override classes not accounting for what is passed as configuration.

## v1.0.0

- Initial release.
