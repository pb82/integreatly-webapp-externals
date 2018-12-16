# `integreatly-asciidoc`

Integreatly Flavoured Asciidoc Library. This package contains the classes and parsing logic to convert a preloaded Asciidoc AST into an Integreatly Walkthrough.

## Usage

```
const { generate } = require('integreatly-asciidoc');

const adoc = asciidoctor.load('/path/to/adoc');
const walkthrough = generate(adoc);
```
