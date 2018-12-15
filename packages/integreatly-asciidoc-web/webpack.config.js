const { resolve } = require('path');

const config = {
  entry: './lib/integreatly-asciidoc-web.js',
  target: 'web',
  node: {
    fs: 'empty',
    'child_process': 'empty'
  },
  mode: 'production',
  output: {
    filename: 'bundle.web.js',
    libraryTarget: 'umd',
    path: resolve(__dirname, 'dist')
  }
};

module.exports = [ config ];