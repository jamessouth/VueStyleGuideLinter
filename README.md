<div align="center">
  <img width="76" height="76" src="https://github.com/jamessouth/Vue-Project-9/blob/4b01f8aa09f745bdd11c5d6360ed2a7b22fb828e/docs/img/icons/apple-touch-icon-76x76.png">
</div>

[![Build Status](https://travis-ci.com/jamessouth/vue-style-lint.svg?branch=master)](https://travis-ci.com/jamessouth/vue-style-lint)

# vue-style-lint

A cli style-linter for Vue using the rules and recommendations in the [Vue Style Guide](https://vuejs.org/v2/style-guide/).  Right now it only checks the order of a component's options as outlined in `Priority C Rules: Recommended - Component/instance options order`.  Each file must be a [single-file component](https://vuejs.org/v2/guide/single-file-components.html) and the element order must be `<template>` - `<script>` - `<style>`.  If a component has no template of its own, `<script>` - `<style>` will also work.

## Install

You can install globally:

```bash
npm i -g vue-style-lint
```

or locally:

```bash
npm i -D vue-style-lint
```

## Usage

If you install globally, the `vsl` command is ready to go.  It takes one argument, a single-file component (`.vue` file) or a folder of them:

<pre>vsl <i>your file/folder, relative to where you are entering the command</i></pre>

If you install locally, you will need something like globally-installed `npx` to run the `vsl` command:

<pre>npx vsl <i>your file/folder, relative to where you are entering the command</i></pre>

----------------------------------------------------------------------------------------------------------------------------------------

Alternatively, you can run the `vsl` command from your `package.json` `scripts` object:
 
<pre>
"scripts": {
    "lint:style": "vsl <i>your file/folder, relative to your project's root"</i>
}
</pre>

You would then run:

`npm run lint:style`

## Output

A message for each file saying that the component's options are already in order or, if not, giving the recommended order.

## Author/Maintainer

[@jamessouth](https://github.com/jamessouth)

## License

MIT © james south
