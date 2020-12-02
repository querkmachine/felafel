# 🧆 Felafel CSS

Felafel's CSS is split into layers roughly akin to the [ITCSS architecture](https://www.xfive.co/blog/itcss-scalable-maintainable-css-architecture/). Each subsequent layer is more specific and explicit than the last, whilst also applying on an ever smaller group of code.

1. [Settings](#settings)
1. [Helpers](#helpers)
1. [Core](#core)
1. [Objects](#objects)
1. [Components](#components)
1. [Overrides](#overrides)

## Settings

Global variables for the project, such as colours, font families, type scales, etc.

This layer doesn't output any CSS.

## Helpers

Functions and mixin definitions.

This layer is named equivalent to Tools in ITCSS. This layer doesn't output any CSS.

## Core

Basic styles, such as CSS resets, normalisers, and default element styles.

This layer is our equivalent to the Generic and Elements layers of ITCSS.

## Objects

Classes that provide styles for elements that are detached from any specific component, such as those that might define a grid system or the size of a heading.

## Components

Discrete pieces of the UI jigsaw. These will usually map one-to-one with a component in the design system.

## Overrides

Classes that override a specific property or properties of the element it is applied to. Overrides will usually be `!important`.
