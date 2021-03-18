# Changelog

## Next release (2.0.0)

### BREAKING: Configuration maps are now merged, not replaced

This release simplifies the customisation of a number of global and component-level options. Configuration maps are now merged together when built, allowing for the modification of existing options and addition of new options without having to rewrite the entire map. At the same time, some of these maps have been renamed to be more consistent with other maps.

The following configurations have been updated to work in this way:

- Breakpoints (using `$fs-breakpoints`).
- Colour palette (`$fs-color-palette`). That this variable was previously named `$fs-default-color-palette`. That variable, though still existing, can no longer be overridden via Felafel configuration.
- Spacings (`$fs-spacing`). This was previously named `$fs-spacing-responsive`.
- Font stacks (`$fs-font-stacks`).
- Font sizes (`$fs-font-sizes`). This was previously named `$fs-font-sizes-responsive`.

### BREAKING: Component configuration options are now defined per-component

Configuration options for components are now tied to the individal component instead of all being configured via a single settings file.

At the same time, component variables have had the fs and component namespaces removed as they're unnecessary now that settings are scoped to each component. Global variables currently retain the fs namespace.

For example, in versions earlier 2.0.0 your button style definition might've looked like this:

```
@use "felafel/src/scss/settings" with (
  $fs-brand-color: #786999,
  $fs-button-background-color: #ffcc00,
  $fs-button-border-width: 2px,
  $fs-button-border-radius: 10px
);
@use "felafel/src/scss/components/button";
```

From version 2.0.0 onwards, it looks more like this:

```
@use "felafel/src/scss/settings" with (
  $fs-brand-color: #786999
);
@use "felafel/src/scss/components/button" with (
  $background-color: #ffcc00,
  $border-width: 2px,
  $border-radius: 10px
);
```

There are some small exceptions to this change. For example, a number of configuration options for the Input component were being re-used for the Checkbox, Radio, and Textarea components. These options have stayed in the global scope and been renamed to better indicate their use.

- `$fs-input-background-color` → `$fs-form-element-background-color`
- `$fs-input-border-color` → `$fs-form-element-border-color`
- `$fs-input-border-radius` → `$fs-form-element-border-radius`
- `$fs-input-text-color` → `$fs-form-element-text-color`

### Other breaking changes

- Refactored `$fs-font-stacks` and associated helpers to use lists instead of strings when passing font stacks. Replace your surrounding quotes with parentheses and have a nice day.
- Refactored Hero component to remove use of `@extend`. Hero heading size is now defined in HTML.
- Refactored Select component, replacing the SVG arrow icon with a HTML/CSS equivalent. This requires a small HTML change to add a new wrapping element around instances of `<select>`.
- Merged Masthead and Masthead Tools components' Sass partials together. You now only have to import the Masthead partial to get the styles for both.

### Everything else

- Added Choice Card component.
- Added configuration option to change the Masthead top border width (`$border-top-width`).
- Added configuration options to control border-radius on the Testimonial component's speech bubble (`$border-radius`) and avatar (`$avatar-border-radius`).
- Added configuration options to hide a browser's default controls for Input component `type`s 'number' (`$number-hide-controls`) and 'search' (`$search-hide-controls`). Both default to `true` to maintain the default styling from previous versions.
- Added configuration option to define the selection (text highlight) colour (`$fs-selection-color`).
- Refactored multiple instances of `if` and `fs-contrasting-color` into a new `colors` function: `fs-color-if-set`.
- Fixed Form Rows within Fieldsets producing a double bottom margin.
- Fixed unprefixed uses of appearance CSS property.
- Fixed `fs-selection-highlight` mixin not being used by the selection core style.
- Fixed selection core style not being behind the `$fs-enable-core-styles` flag.
- Fixed input masks having incorrectly rounded corners if rounded corners are enabled.

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
