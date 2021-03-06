var webpack = require('webpack');
var UglifyJsPlugin = webpack.optimize.UglifyJsPlugin;
var path = require('path');
var env = require('yargs').argv.mode;
var buildPath = path.resolve(__dirname + '/api/dist');

var plugins = [], outputFile;

if (env === 'build') {
  plugins.push(new UglifyJsPlugin({
    warnings: false
  }));
  outputFile = 'citrix.min.js';
} else {
  outputFile = 'citrix.js';
}

var config = {
  entry: [__dirname + '/api/src/citrix.js'],
  devtool: 'source-map',
  output: {
    path: buildPath + '/' + env,
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
        exclude: /node_modules/
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
