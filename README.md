# 🧆 Felafel

Felafel (aka, the **Fel**inesoft **A**gile **F**ront-**E**nd **L**ibrary) is a set of basic components that we use in projects at [Felinesoft](https://felinesoft.com).

## Current state

Felafel is mostly used internally at Felinesoft. As a result it is tailored to the problems we frequently deal with and opinionated to the way that we work. The project is fairly likely to accomodate breaking changes should the need arise, but these will be minimised where possible.

## Installing Felafel

### Using precompiled files

If little to no customisation is necessary, you can copy the precompiled files from the `dist` folder or reference them directly in HTML.

```html
<!-- In the page's <head> element -->
<link ref="stylesheet" href="node_modules/@querkmachine/felafel/dist/all.css" />

<!-- Above the page's closing <body> tag -->
<script src="node_modules/@querkmachine/felafel/dist/all.js"></script>

<!-- Want everything? Do this. -->
<script>
  window.fs.initAll();
</script>

<!-- Only want a specific module? Then do something like this. -->
<script>
  const tabsElement = document.getElementById("tabs");
  window.fs.loadModule("tabs").then((tabs) => {
    new tabs.default(tabsElement);
  });
</script>
```

## Using Felafel

Felafel makes heavy use of several modern features introduced into the Sass language, such as the module system. Felafel **requires Dart Sass version 1.33.0 or higher** as a result and will not work with Node or Ruby versions of Sass, nor older versions of Dart Sass.

Felafel is built in a modular fashion, and is most powerful when used alongside Sass. Using Sass it’s possible to only import certain components or styles into a project:

```scss
// We want all of this
@use "node_modules/@querkmachine/felafel/src/scss/core";

// Some useful mixins here
@use "node_modules/@querkmachine/felafel/src/scss/helpers/typography";

// Want this too
@use "node_modules/@querkmachine/felafel/src/scss/components/step-indicator";
```

How you implement Sass can be as simple or complex as necessary. It can be a terminal command, an npm script, or part of a whole Gulpwebpackbrowserify build process—Felafel doesn’t care.

### Usage tips

- Felafel is utilitarian as a default. Out of the box it’s black and white, uses system fonts, and only supports up to four columns. It tries to not be too assuming, whilst still working to maintain some consistency.
- Felafel has a lot of override classes. If a bit of spacing looks weird, you want to change the size of this one heading, or put all this text in a big red box without making a whole new component for it, you can do that with overrides.
- If something isn't precisely how you need it, then remember that you don't need to referenc it directly. Every part is optional, you can always exclude one thing in favour of a bespoke approach if you want to.
