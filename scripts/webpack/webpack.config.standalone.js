const webpack = require('webpack');
const path = require('path');
const nodeExternals = require('webpack-node-externals');
const base = require('./base/base.config.js');
const assign = Object.assign;
const ROOT_DIR = path.resolve(__dirname, '../../');

module.exports = assign({}, base, {
  entry: null,
  output: null,
  resolve: assign({}, base.resolve, {
    // https://webpack.js.org/configuration/resolve/#resolve-modules
    modules: [
      path.join(ROOT_DIR, './src/server')
    ],
    // https://webpack.js.org/configuration/resolve/#resolve-alias
    alias: assign({}, base.resolve.alias, {
      '~': path.join(ROOT_DIR, './src/server')
    })
  }),
  // https://webpack.js.org/configuration/target/
  target: 'node',
  // https://webpack.js.org/configuration/externals/
  externals: [nodeExternals()],
  // https://webpack.js.org/configuration/node/
  node: {
    __dirname: false,
    __filename: false
  },
  plugins: base.plugins.concat([
    new webpack.DefinePlugin({
      ROOT_DIR: JSON.stringify(ROOT_DIR),
      DEBUG: JSON.stringify(true)
    })
  ])
});
