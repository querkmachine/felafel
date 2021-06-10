# 🧆 Felafel

Felafel (aka, the **Fel**inesoft **A**gile **F**ront-**E**nd **L**ibrary) is a set of basic components and layouts built according to the [Felinesoft front-end standards](http://querkmachine.github.io/FSFrontEndDocs/) and compatible with [Kickstart8](https://github.com/querkmachine/kickstart8), the front-end framework used across all web projects starting from 2020.

## Current state

In lieu of a demo or significant documentation at this time, examples of components and layouts are located in the `demo/` folder of the package. I’ve started to write fuller documentation and a more comprehensive example implementation (with them being the same thing to be extra fancy), but they’re far from ready.

## Installing Felafel

The project is set up a bit differently to others as I’ve made it in the style of an npm package. I did this because packages are generally a lot easier to work with than submodules, which ought to be useful for rapid prototyping and building demos.

### Using precompiled files

If little to no customisation is necessary, you can copy the precompiled files from the `dist` folder or reference them directly in HTML.

```
<!-- In the page's <head> element -->
<link ref="stylesheet" href="path-to-felafel/dist/all.css">

<!-- Above the page's closing <body> tag -->
<script src="path-to-felafel/dist/all.js"></script>
<script>window.fs.initAll();</script>
```

## Using Felafel

Felafel makes heavy use of several modern features introduced into the Sass language, such as the module system. Felafel **requires Dart Sass version 1.33.0 or higher** as a result and will not work with Node or Ruby versions of Sass, nor older versions of Dart Sass.

Felafel is built in a (mostly) modular way, and is most powerful when used alongside Sass. Using Sass it’s possible to only import certain components or styles into a project:

```
// We want all of this
@use "node_modules/fs-felafel/src/scss/core";

// Some useful mixins here
@use "node_modules/fs-felafel/src/scss/helpers/typography";

// Want this too
@use "node_modules/fs-felafel/src/scss/components/step-indicator";
```

Alternatively, get everything:

```
@use "node_modules/fs-felafel/src/scss/all";
```

How you implement Sass can be as simple or complex as necessary. It can be a terminal command, an npm script, or part of a whole Gulpwebpackbrowserify build process—Felafel doesn’t care.

### Usage tips

- Felafel is utilitarian as a default. Out of the box it’s black and white, uses system fonts, and only supports up to four columns. It tries to not be too assuming, whilst still working to maintain some consistency.
- Felafel has a lot of override classes. If a bit of spacing looks weird, you want to change the size of this one heading, or put all this text in a big red box without making a whole new component for it, you can do that with overrides.
- Forms are expected to take up about two-thirds of the container width (by the default definitions of those). You can go wider if you want, but inputs tend to start looking a bit weird if you do.
