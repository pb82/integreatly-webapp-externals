# Integreatly Flavoured Asciidoc Package

This repository contains a number of interdependent projects around Integreatly Flavoured Asciidoc. The individual projects can be found under `packages`. This bundle is managed as a monorepo using `lerna`.

## Getting started

Install dependencies and build projects:

```sh
$ yarn
$ yarn run lerna:bootstrap
$ yarn run lerna:build
```

This will create the `iad` binary as well as the `web` and `node` libraries.

## The individual Projects

1. *integreatly-asciidoc-lib* Generate Integreatly flavoured Asciidoc from a parsed adoc file.
1. *integreatly-asciidoc-node* Node bindings for `integreatly-asciidoc-lib`.
1. *integreatly-asciidoc-web* Browser bindings for `integreatly-asciidoc-lib`.
1. *integreatly-asciidoc-bin* Contains the `iad` binary to check and verify the Asciidoc. Useful for continuous integration.
