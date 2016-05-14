var webpack = require('webpack');
var UglifyJsPlugin = webpack.optimize.UglifyJsPlugin;
var path = require('path');
var env = require('yargs').argv.mode;

var plugins = [], outputFile;

if (env === 'build') {
  plugins.push(new UglifyJsPlugin({ minimize: true }));
  outputFile = 'citrix.min.js';
} else {
  outputFile = 'citrix.js';
}

var config = {
  entry: ['babel-polyfill', __dirname + '/api/src/citrix.js'],
  devtool: 'source-map',
  output: {
    path: __dirname + '/api/dist',
    filename: outputFile,
    library: "CITRIX",
    libraryTarget: 'umd',
    umdNamedDefine: true
  },
  module: {
    loaders: [
      {
        test: /(\.jsx|\.js)$/,
        loader: 'babel',
        exclude: /(node_modules|bower_components)/
      },
      {
        test: /(\.jsx|\.js)$/,
        loader: "eslint-loader",
        exclude: /node_modules/
      }
    ]
  },
  resolve: {
    root: path.resolve('./api/src'),
    extensions: ['', '.js']
  },
  plugins: plugins
};

module.exports = config;
