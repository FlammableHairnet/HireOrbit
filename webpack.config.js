var path = require('path');
var webpack = require('webpack');
var production = process.env.NODE_ENV === 'production';
var CleanPlugin = require('clean-webpack-plugin');

var outputPath = __dirname + '/client';

if (production) {
    plugins = plugins.concat([
      new CleanPlugin('builds'),
      
      new webpack.optimize.DedupePlugin(),

     
      new webpack.optimize.OccurenceOrderPlugin(),

   
      new webpack.optimize.MinChunkSizePlugin({
          minChunkSize: 51200, // ~50kb
      }),

      new webpack.optimize.UglifyJsPlugin({
          mangle:   true,
          compress: {
              warnings: false, // Suppress uglification warnings
          },
      }),

      // This plugins defines various variables that we can set to false
      // in production to avoid code related to them from being compiled
      // in our final bundle
      new webpack.DefinePlugin({
          __SERVER__:      !production,
          __DEVELOPMENT__: !production,
          __DEVTOOLS__:    !production,
          'process.env':   {
              BABEL_ENV: JSON.stringify(process.env.NODE_ENV),
          },
      })

    ]);
}

module.exports = {
  entry: './client/init.js',
  output: { path: outputPath, filename: 'bundle.js' },
  devServer: {
    inline: true,
    port: 8000
  },
  // plugin: plugins,
  devtool: 'cheap-eval-source-map ',
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        loader: 'babel',
        exclude: [/node_modules/, /typings/, /bower_components/],
        query: {
          presets: ['es2015', 'react']
        }
      }
    ]
  },

};

