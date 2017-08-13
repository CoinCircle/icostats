const webpack = require('webpack');
const client = require('./base/client.base.config.js');
const server = require('./base/server.base.config.js');
const path = require('path');
const ROOT_DIR = path.resolve(__dirname, '../../');

module.exports = [
  Object.assign({}, client, {
    performance: {
      hints: 'warning'
    },
    plugins: client.plugins.concat([
      new webpack.DefinePlugin({
        ROOT_DIR: JSON.stringify(ROOT_DIR),
        DEBUG: JSON.stringify(true)
      })
    ])
  }),
  Object.assign({}, server, {
    performance: {
      hints: 'warning'
    },
    plugins: server.plugins.concat([
      new webpack.DefinePlugin({
        ROOT_DIR: JSON.stringify(ROOT_DIR),
        DEBUG: JSON.stringify(true)
      })
    ])
  }),
];
