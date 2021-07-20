const path = require('path');

module.exports = {
  entry: './src/js/client-side/index.js',
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'src/js'),
  },
  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
        },
      },
    ],
  },
  target: ['es5'],
};
