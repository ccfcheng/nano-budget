const path = require('path');

module.exports = {

  entry: './src/app.js',

  output: {
    path: path.join(__dirname, '/dist'),
    filename: 'app.js',
    publicPath: '/',
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
    ],
  },

};
