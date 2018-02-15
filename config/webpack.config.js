const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const ROOT_PATH = `${__dirname}/..`;

module.exports = {
  entry: `${ROOT_PATH}/renderer/index.jsx`,
  output: {
    path: `${ROOT_PATH}/build/dist`,
    filename: './browser.js',
  },
  devServer: {
    port: 8080,
    contentBase: `${ROOT_PATH}/build/dist`,
  },
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  plugins: [
    new ExtractTextPlugin('browser.css'),
  ],
  module: {
    loaders: [{
      test: /.js[x]?$/,
      loader: 'babel-loader',
      exclude: /node_modules/,
      query: {
        presets: ['es2015', 'react'],
        plugins: ['transform-object-rest-spread'],
      },
    }, {
      test: /\.css$/,
      loader: ExtractTextPlugin.extract('style-loader', 'css-loader'),
    }, {
      test: /\.woff|.woff2|.ttf|.eot|.svg*.*$/,
      loader: 'file',
    }],
  },
};
