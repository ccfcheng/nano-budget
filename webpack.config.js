require('dotenv').config();
const path = require('path');
const webpack = require('webpack');
const StringReplacePlugin = require('string-replace-webpack-plugin');

function makePluginsList(env) {
  if (env === 'production') {
    return [
      new webpack.DefinePlugin({
        'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
      }),
      new StringReplacePlugin(),
      new webpack.optimize.UglifyJsPlugin({
        compressor: {
          warnings: false,
          screw_ie8: true,
        },
      }),
    ];
  }
  return [
    new StringReplacePlugin(),
  ];
}

module.exports = {

  entry: './src/app.js',

  output: {
    path: path.join(__dirname, '/dist'),
    filename: 'app.js',
    publicPath: '/dist',
  },

  module: {
    loaders: [
      {
        test: /.jsx?$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        query: {
          presets: ['es2015', 'react', 'stage-1'],
        },
      },
      {
        test: /app.js$/,
        loader: StringReplacePlugin.replace({
          replacements: [
            {
              pattern: /REPLACE_WITH_API_KEY/g,
              replacement: () => process.env.API_KEY,
            },
            {
              pattern: /REPLACE_WITH_AUTH_DOMAIN/g,
              replacement: () => process.env.AUTH_DOMAIN,
            },
            {
              pattern: /REPLACE_WITH_DATABASE_URL/g,
              replacement: () => process.env.DATABASE_URL,
            },
            {
              pattern: /REPLACE_WITH_STORAGE_BUCKET/g,
              replacement: () => process.env.STORAGE_BUCKET,
            },
          ],
        }),
      },
    ],
  },

  plugins: makePluginsList(process.env.NODE_ENV),

};
