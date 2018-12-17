import { generate } from 'integreatly-asciidoc-lib';
import Asciidoctor from 'asciidoctor.js';

const asciidoctor = Asciidoctor();

/**
 * Parses raw Asciidoc and returns an Integreatly Walkthrough
 * @param rawAsciidoc Raw Asciidoc string
 * @param attributes Injected adoc attributes
 * @returns {object} Walkthrough
 */
function parse(rawAsciidoc, attributes) {
    const adoc = asciidoctor.load(rawAsciidoc, { attributes });
    return generate(adoc);
}

export { parse };
