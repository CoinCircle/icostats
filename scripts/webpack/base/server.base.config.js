const path = require('path');
const nodeExternals = require('webpack-node-externals');
const base = require('./base.config.js');
const assign = Object.assign;
const ROOT_DIR = path.resolve(__dirname, '../../../');

module.exports = assign({}, base, {
  // https://webpack.js.org/configuration/entry-context/#entry
  entry: {
    server: path.join(ROOT_DIR, './src/server/index.js'),
    workers: path.join(ROOT_DIR, './scripts/workers/index.js')
  },
  // https://webpack.js.org/configuration/output/
  output: {
    filename: 'dist/[name].js'
  },
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
  }
});
