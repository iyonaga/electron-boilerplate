const path = require('path');
const TerserPlugin = require('terser-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

const isProduction =
  process.argv[process.argv.indexOf('--mode') + 1] === 'production';

module.exports = {
  target: 'electron-main',

  entry: {
    main: './src/main.js'
  },

  output: {
    filename: '[name].js',
    path: path.join(__dirname, 'dist')
  },

  node: {
    __dirname: false,
    __filename: false
  },

  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            cacheDirectory: true
          }
        }
      }
    ]
  },

  plugins: [],

  optimization: {
    minimizer: [
      new TerserPlugin({
        parallel: true,
        terserOptions: {
          compress: {
            drop_console: true
          }
        }
      })
    ]
  }
};

if (isProduction) {
  module.exports.plugins.push(new CleanWebpackPlugin());
}
