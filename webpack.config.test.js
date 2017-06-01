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
      settings: path.resolve(__dirname, './settings.js'),
      server: path.resolve(__dirname, './src/server'),
      shared: path.resolve(__dirname, './src/shared'),
      client: path.resolve(__dirname, './src/client')
    }
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        loader: 'babel-loader',
        query: {
          presets: ['es2015', 'react', 'stage-2', 'flow'],
          plugins: ['transform-decorators-legacy']
        }
      }
    ]
  }
};
