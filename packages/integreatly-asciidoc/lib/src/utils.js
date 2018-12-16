function pushMessage(messages, severity, text, source_location) {
    messages.push({
        severity,
        message: {
            text,
            source_location
        }
    });
}

const pushError = (messages, text, loc) => pushMessage(messages, 'ERROR', text, loc);
const pushWarn = (messages, text, loc) => pushMessage(messages, 'WARN', text, loc);
const pushOpt = (messages, text, loc) => pushMessage(messages, 'OPTIONAL', text, loc);

export { pushError, pushWarn, pushOpt };
