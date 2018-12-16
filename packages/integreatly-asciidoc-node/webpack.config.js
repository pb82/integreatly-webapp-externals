const { resolve } = require('path');

const config = {
    entry: './lib/integreatly-asciidoc-node.js',
    target: 'node',
    mode: 'production',
    output: {
        filename: 'bundle.node.js',
        libraryTarget: 'commonjs',
        path: resolve(__dirname, 'dist')
    }
};

module.exports = [ config ];
