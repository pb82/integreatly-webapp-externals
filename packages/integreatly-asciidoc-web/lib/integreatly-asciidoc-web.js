import { generate } from '../../integreatly-asciidoc-lib';
import Asciidoctor from 'asciidoctor.js';

const asciidoctor = Asciidoctor();

/**
 * Parses raw Asciidoc and returns an Integreatly Walkthrough
 * @param rawAsciidoc Raw Asciidoc string
 * @returns {object} Walkthrough
 */
function parse(rawAsciidoc) {
    const adoc = asciidoctor.load(rawAsciidoc);
    return generate(adoc);
}

export { parse };
