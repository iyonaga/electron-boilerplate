const path = require('path');
const TerserPlugin = require('terser-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

const isProduction =
  process.argv[process.argv.indexOf('--mode') + 1] === 'production';

module.exports = {
  target: 'electron-main',

  entry: {
    main: './src/main/index.ts'
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
        test: /\.(j|t)sx?$/,
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

  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx']
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
