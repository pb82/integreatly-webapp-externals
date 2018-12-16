const { resolve } = require('path');

const config = {
    entry: './lib/integreatly-asciidoc-web.js',
    target: 'web',
    mode: 'production',
    node: {
        fs: 'empty',
        'child_process': 'empty'
    },
    output: {
        filename: 'bundle.web.js',
        libraryTarget: 'umd',
        path: resolve(__dirname, 'dist')
    }
};

module.exports = [ config ];
