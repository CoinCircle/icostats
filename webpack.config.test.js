/* eslint-disable */
var nodeExternals = require('webpack-node-externals');
var path = require('path');

module.exports = {
  target: 'node',
  externals: [nodeExternals()],
  devtool: 'inline-source-map',
  resolve: {
    /**
    * Access config from anywhere via `import settings from 'settings'``
    */
    alias: {
      settings: path.resolve(__dirname, './settings.js')
    }
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        query: {
          presets: ['es2015', 'stage-2']
        }
      }
    ]
  }
};
