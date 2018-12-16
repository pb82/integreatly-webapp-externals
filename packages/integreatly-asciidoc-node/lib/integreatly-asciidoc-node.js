import { generate } from '../../integreatly-asciidoc-lib';
import Asciidoctor from 'asciidoctor.js';

const asciidoctor = Asciidoctor();

const SeverityLevel = {
    WARN: 'WARN',
    ERROR: 'ERROR'
};

// Treat warnings as errors?
const pedantic = (c) => c['warnings'] === 'error';

// Print warnings and errors
function reportAndCheckSuccess(logger, walkthroughMessages, context) {
    let messages = logger.getMessages();
    messages = messages.concat(walkthroughMessages);

    let success = true;

    messages.forEach(message => {
        const { severity, message: { text, source_location} } = message;
        if (severity === SeverityLevel.ERROR) {
            success = success && false;
        } else if (severity === SeverityLevel.WARN && pedantic(context)) {
            success = success && false;
        }

        console.error(`${severity} ${text} at ${source_location}`);
    });

    return success;
}

/**
 * Parses raw Asciidoc and returns an Integreatly Walkthrough
 * @param rawAsciidoc Raw Asciidoc string
 * @returns {object} Walkthrough
 */
function parse(rawAsciidoc) {
    const adoc = asciidoctor.load(rawAsciidoc);
    return generate(adoc);
}

/**
 * Verifies if the passed raw Asciidoc is valid and can be parsed into an Integreatly Walkthrough.
 * Any errors and warning will be logged. Returns a boolean indicating if any errors were encountered.
 * @param rawAsciidoc Raw asciidoc as string
 * @param context Options object (`errors`)
 * @returns {boolean} True if no errors were encountered
 */
function check(rawAsciidoc, context) {
    const logger = asciidoctor.MemoryLogger.$new();
    asciidoctor.LoggerManager.setLogger(logger);

    const adoc = asciidoctor.load(rawAsciidoc),
        walkthrough = generate(adoc),
        walkthroughMessages = [];

    walkthrough.verify(walkthroughMessages);
    return reportAndCheckSuccess(logger, walkthroughMessages, context);
}

export { check, parse };
