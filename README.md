# 🧆 Felafel

Felafel (aka, the *Fel*inesoft *A*gile *F*ront-*E*nd *L*ibrary) is a set of basic components and layouts built according to the [Felinesoft front-end standards](http://querkmachine.github.io/FSFrontEndDocs/) and compatible with [Kickstart8](https://github.com/querkmachine/kickstart8), the front-end framework used across all web projects starting from 2020.

## Installation

Felafel is provided as an npm package and can be installed in the same way as one.

```
npm install fs-felafel
```

## Usage

### With custom Sass and JavaScript

TBD.

### With pre-compiled files

The pre-compiled CSS and JavaScript provided can be included directly into a page by referencing the files within `node_modules`. These pre-compiled files include all styles for every component, even those that aren't being used.

```
<link rel="stylesheet" href="node_modules/fs-felafel/dist/felafel.css">
<script src="node_modules/fs-felafel/dist/felafel.js" defer></script>
```

Certain styles can then be customised using CSS Custom Properties on browsers that support them (basically all except IE).

```
:root {
	--font-family-body: 'Proxima Nova', Gotham, sans-serif;
	--color-brand: #fc0;
}
```
