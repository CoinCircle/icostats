const webpack = require('webpack');
const BabiliPlugin = require("babili-webpack-plugin");
const clientBase = require('./base/client.base.config.js');
const serverBase = require('./base/server.base.config.js');
const path = require('path');
const ROOT_DIR = path.resolve(__dirname, '../../');

const client = Object.assign({}, client, {
  plugins: client.plugins.concat([
    new webpack.DefinePlugin({
      ROOT_DIR: JSON.stringify(ROOT_DIR),
      DEBUG: JSON.stringify(false)
    }),
    new BabiliPlugin(babiliOptions, overrides)
  ])
});

const server = Object.assign({}, server, {
  plugins: server.plugins.concat([
    new webpack.DefinePlugin({
      ROOT_DIR: JSON.stringify(ROOT_DIR),
      DEBUG: JSON.stringify(false)
    }),
    new BabiliPlugin(babiliOptions, overrides)
  ])
})

module.exports = [
  client,
  server
];
