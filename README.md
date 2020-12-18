# 🧆 Felafel

Felafel (aka, the **Fel**inesoft **A**gile **F**ront-**E**nd **L**ibrary) is a set of basic components and layouts built according to the [Felinesoft front-end standards](http://querkmachine.github.io/FSFrontEndDocs/) and compatible with [Kickstart8](https://github.com/querkmachine/kickstart8), the front-end framework used across all web projects starting from 2020.

## Current state

At the moment I’ve done all the template and forms-y items, including the five wireframes I was given to focus on—three condition of grants pages, grants overview, and edit details. Content page items (cards, collapsable panels, things like that) aren’t done.

In lieu of a demo or significant documentation at this time, examples of components and layouts are located in the `demo/` folder of the package. I’ve started to write fuller documentation and a more comprehensive example implementation (with them being the same thing to be extra fancy), but they’re far from ready.

## Installing Felafel

The project is set up a bit differently to others as I’ve made it in the style of an npm package. I did this because packages are generally a lot easier to work with than submodules, which ought to be useful for rapid prototyping and building demos.

### Using npm

As we (presumably) don’t want Felafel to be publicly hosted, it needs to be installed using a reference to the git repo. This would normally be achieved like so:

```
npm install --save git+ssh://git@ssh.dev.azure.com:v3/felinesoft/FelinesoftFrameworks/FELAFEL
```

…However this seems to error out. It works for other git providers I’ve tried, so presumably this is a DevOps configuration or permissions problem.

Azure DevOps has a way to [set up a private npm registry](https://docs.microsoft.com/en-us/azure/devops/artifacts/get-started-npm?view=azure-devops&tabs=windows) in a similar vein to NuGet. We might want to do that.

### Using precompiled files

If little to no customisation is necessary, you can [copy the precompiled files from the git repo](https://dev.azure.com/felinesoft/FelinesoftFrameworks/_git/FELAFEL?path=%2Fdist) and reference them directly in HTML.

```
<!-- In the page's <head> element -->
<link ref="stylesheet" href="path-to-felafel/dist/all.css">

<!-- Above the page's closing <body> tag -->
<script src="path-to-felafel/dist/all.js"></script>
<script>window.fs.initAll();</script>
```

## Using Felafel

Felafel is built in a (mostly) modular way, and is most powerful when used alongside Sass. Using Sass it’s possible to only import certain components or styles into a project:

```
// We want all of this
@use "node_modules/fs-felafel/src/scss/core";

// Some useful mixins here
@use "node_modules/fs-felafel/src/scss/helpers/typography";

// Want this too
@use "node_modules/fs-felafel/src/scss/components/step-indicator";
```

(In practice some components have dependencies on others that aren’t currently described in code. Date inputs won’t work without text inputs, for example. I’ll look into sorting that out at some point.)

Alternatively, get everything:

```
@use "node_modules/fs-felafel/src/scss/all";
```

How Sass has been implemented can be as simple or complex as necessary. It can be a terminal command, an npm script, or part of a whole Gulpwebpackbrowserify build process—Felafel doesn’t care. Just be sure it’s using some implementation of [Dart Sass](https://github.com/sass/dart-sass) and it should “just work” (fingers crossed).

### Customising Felafel

Like all CSS, Felafel’s styles can be overwritten by simply including more CSS that overwrites it.

To customise Felafel directly, import the settings file with any overrides you want to apply before importing everything else.

```
// First, load the settings file
// Overruling some of variables as we go
@use "node_modules/fs-felafel/src/scss/settings" with (
	$fs-brand-color: green,
	$fs-page-width: 1200px,
	$fs-breakpoints: (
		tablet: 599px,
		desktop: 769px,
	)
	// Any other options...
);

// Then load everything else
// Can be all of Felafel or just the parts you want
@use "node_modules/fs-felafel/src/scss/all";
```

There are [a lot of variables that can be overridden](https://dev.azure.com/felinesoft/FelinesoftFrameworks/_git/FELAFEL?path=%2Fsrc%2Fscss%2F_settings.scss), ranging from project wide changes (do you want stuff to have rounded corners or not?) to changing colours on individual components.

Not _everything_ is currently configurable in this way, and changing some variables will probably make everything fall over. The defaults are sensible, and it is to some degree self-correcting—change the background colour of a button and it’ll (albeit wonkily) change the default text colour to fit—but it’s a work in progress.

### Usage tips

- Felafel is utilitarian as a default. Out of the box it’s black and white, uses system fonts, and only supports up to four columns. It tries to not be too assuming, whilst still working to maintain some consistency.
- Felafel has a lot of override classes. If a bit of spacing looks weird, you want to change the size of this one heading, or put all this text in a big red box without making a whole new component for it, you can do that with overrides.
- Forms are expected to take up about two-thirds of the container width (by the default definitions of those). You can go wider if you want, but inputs tend to start looking a bit weird if you do.
