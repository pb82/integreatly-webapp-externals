const { check } = require('../../integreatly-asciidoc-node/dist/bundle.node');
const { readFile } = require('fs');
const { verifyDirectoryStructure, Collector } = require('./utils');
const program = require('commander');
const queue = require('async.queue');

const Ajv = require('ajv');
const validateJson = new Ajv().compile(require('../resources/schema'));

const BANNER = 'Integreatly Asciidoc';

function getVersion() {
    return `${BANNER} v${require('../package').version}`;
}

function handleError(err) {
    console.error(err);
    process.exit(1);
}

function readFromFile(path) {
    return new Promise((resolve, reject) => {
        readFile(path, (err, data) => {
            if (err) {
                return reject(err);
            }
            return resolve(data.toString('utf-8'));
        });
    });
}

function processDirectory(dir, context) {
    const collector = new Collector(dir);

    // Process all adoc files sequentially
    const adocQueue = queue((doc, cb) => {
        readFromFile(doc).then(raw => {
            console.log(`processing ${doc}`);
            const success = check(raw, context);
            if (!success) {
                process.exit(1);
            }
            return cb();
        }).catch(handleError);
    });

    // Process all json files sequentially
    const jsonQueue = queue((doc, cb) => {
        console.log(`processing ${doc}`);
        let json;
        try {
            json = require(doc);
        } catch (_) {
            console.error(`ERROR Invalid or empty JSON file`);
            process.exit(1);
        }

        const success = validateJson(json);
        if (!success) {
            console.error('ERROR');
            console.error(validateJson.errors);
            process.exit(1);
        }
        return cb();
    });

    collector.on('adoc', file => {
        adocQueue.push(file)
    });

    collector.on('json', file => {
        jsonQueue.push(file);
    });

    // Collect all json and adoc files
    collector.run();
}

function main() {
    program
        .version(getVersion())
        .usage('[options]')
        .option('-d --directory <directory>', 'Walkthroughs path')
        .parse(process.argv);

    if (program.directory) {
        verifyDirectoryStructure(program.directory)
            .then(dir => processDirectory(dir, program));
    } else {
        return program.outputHelp();
    }
}

main();
