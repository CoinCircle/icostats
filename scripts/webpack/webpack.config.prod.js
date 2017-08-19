const webpack = require('webpack');
const BabiliPlugin = require('babili-webpack-plugin');
const clientBase = require('./base/client.base.config.js');
const serverBase = require('./base/server.base.config.js');
const path = require('path');
const ROOT_DIR = path.resolve(__dirname, '../../');


const client = Object.assign({}, clientBase, {
  plugins: clientBase.plugins.concat([
    new webpack.DefinePlugin({
      ROOT_DIR: JSON.stringify(ROOT_DIR),
      'process.env.NODE_ENV': JSON.stringify('production'),
      DEBUG: JSON.stringify(false)
    }),
    new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
    new BabiliPlugin()
  ])
});

const server = Object.assign({}, serverBase, {
  plugins: serverBase.plugins.concat([
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production'),
      ROOT_DIR: JSON.stringify(ROOT_DIR),
      DEBUG: JSON.stringify(false)
    }),
    new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
    new BabiliPlugin()
  ])
});

module.exports = [
  client,
  server
];
