/**
 * Base webpack config.
 *
 * This contains configurations to be included in all webpack configs.
 */
const webpack = require('webpack');
const nodeExternals = require('webpack-node-externals');
const path = require('path');
const {
  CheckerPlugin,
  TsConfigPathsPlugin
} = require('awesome-typescript-loader');

const ROOT_DIR = path.resolve(__dirname, '../../../');

module.exports = {
  context: ROOT_DIR,
  // https://webpack.js.org/configuration/devtool/
  devtool: 'inline-source-map',
  // https://webpack.js.org/configuration/resolve/
  resolve: {
    // https://webpack.js.org/configuration/resolve/#resolve-extensions
    extensions: ['.js', '.json', '.jsx', '.ts', '.tsx'],
    // https://webpack.js.org/configuration/resolve/#resolve-modules
    modules: [
      path.join(ROOT_DIR, './node_modules')
    ],
    // https://webpack.js.org/configuration/resolve/#resolve-alias
    alias: {
      client: path.join(ROOT_DIR, './src/client'),
      server: path.join(ROOT_DIR, './src/server'),
      settings: path.join(ROOT_DIR, './settings.js'),
      shared: path.join(ROOT_DIR, './src/shared'),
      scripts: path.join(ROOT_DIR, './scripts')
    }
  },
  // https://webpack.js.org/configuration/module/
  module: {
    // https://webpack.js.org/configuration/module/#rule-loaders
    loaders: [
      {
        test: /\.tsx?$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'awesome-typescript-loader'
      },
      {
        test: /\.jsx?$/,
        loader: 'babel-loader',
        exclude: /(node_modules|bower_components)/,
        query: {
          presets: [
            // https://babeljs.io/docs/plugins/preset-env/
            ['env', {
              // https://babeljs.io/docs/plugins/preset-env/#optionstargets
              targets: {
                // https://babeljs.io/docs/plugins/preset-env/#optionstargets-browsers
                browsers: ['last 2 versions'],
                // https://babeljs.io/docs/plugins/preset-env/#optionstargets-node
                node: 'current',
                // https://babeljs.io/docs/plugins/preset-env/#optionstargets-uglify
                uglify: false
              },
              // https://babeljs.io/docs/plugins/preset-env/#optionsuse-built-ins
              useBuiltIns: true,
              // https://babeljs.io/docs/plugins/preset-env/#optionsdebug
              debug: false
            }],
            'react',
            'flow'
          ],
          plugins: [
            // https://babeljs.io/docs/plugins/transform-class-properties/
            'transform-class-properties',
            // https://babeljs.io/docs/plugins/transform-object-rest-spread/
            'transform-object-rest-spread',
            // https://babeljs.io/docs/plugins/transform-async-generator-functions/
            'transform-async-generator-functions'
          ]
        }
      }
    ]
  },
  // https://webpack.js.org/configuration/plugins/
  plugins: [
    new CheckerPlugin(),
    new TsConfigPathsPlugin(),
    new webpack.ProvidePlugin({
      Promise: 'bluebird'
    })
  ]
};
