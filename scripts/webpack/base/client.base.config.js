const path = require('path');
const base = require('./base.config.js');
const assign = Object.assign;
const ROOT_DIR = path.resolve(__dirname, '../../../');

module.exports = assign({}, base, {
  // https://webpack.js.org/configuration/entry-context/#entry
  entry: path.join(ROOT_DIR, './src/client/index.js'),
  // https://webpack.js.org/configuration/output/
  output: {
    filename: 'public/bundle.js'
  },
  resolve: assign({}, base.resolve, {
    // https://webpack.js.org/configuration/resolve/#resolve-modules
    modules: [
      path.join(ROOT_DIR, './node_modules'),
      path.join(ROOT_DIR, './src/client')
    ],
    // https://webpack.js.org/configuration/resolve/#resolve-alias
    alias: assign({}, base.resolve.alias, {
      '~': path.join(ROOT_DIR, './src/client'),
      settings: path.join(ROOT_DIR, './settings-public.js')
    })
  })
});
