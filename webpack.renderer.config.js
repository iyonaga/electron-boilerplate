const webpack = require('webpack');
const path = require('path');
const { spawn } = require('child_process');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');

process.env.PORT = process.env.PORT || 8080;
const port = process.env.PORT;
const isProduction =
  process.argv[process.argv.indexOf('--mode') + 1] === 'production';

module.exports = {
  target: 'electron-renderer',

  entry: {
    renderer: './src/renderer/index.js'
  },

  output: {
    filename: '[name].js',
    path: path.join(__dirname, 'dist'),
    publicPath: isProduction ? './' : `http://localhost:${port}/`
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
      },

      {
        test: /\.s?css$/,
        exclude: /\.global\.s?css$/,
        use: [
          'css-hot-loader',
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              importLoaders: 3,
              modules: {
                localIdentName: '[name]--[local]--[hash:base64:5]'
              }
            }
          },
          'postcss-loader',
          'sass-loader',
          {
            loader: 'sass-resources-loader',
            options: {
              resources: './src/renderer/assets/styles/helpers/**.scss'
            }
          }
        ]
      },

      {
        test: /\.global\.s?css$/,
        use: [
          'css-hot-loader',
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              importLoaders: 2,
              modules: false
            }
          },
          'postcss-loader',
          'sass-loader'
        ]
      },

      {
        test: /\.svg$/,
        use: ['svg-url-loader']
      },

      {
        test: /\.(jpe?g|png|gif|ico)$/i,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 8192,
              name: '[name].[ext]',
              outputPath: 'img/'
            }
          }
        ]
      },

      {
        test: /\.(woff|woff2|eot|otf|ttf)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
              outputPath: 'fonts/'
            }
          }
        ]
      }
    ]
  },

  resolve: {
    extensions: ['.js', '.jsx']
  },

  plugins: [
    new MiniCssExtractPlugin({
      filename: 'styles.css'
    }),
    new HtmlWebpackPlugin({
      inject: false,
      template: './src/index.html',
      port
    }),
    new webpack.HotModuleReplacementPlugin()
  ],

  optimization: {
    // namedModules: true,
    minimizer: isProduction
      ? [
          new TerserPlugin({
            parallel: true,
            terserOptions: {
              compress: {
                drop_console: true
              }
            }
          })
        ]
      : []
  },

  devServer: {
    port,
    compress: true,
    hot: true,
    contentBase: path.join(__dirname, 'dist'),
    watchContentBase: true,
    before() {
      spawn('yarn', ['run', 'dev:main'], {
        shell: true,
        env: process.env,
        stdio: 'inherit'
      })
        .on('close', code => {
          process.exit(code);
        })
        .on('error', spawnError => {
          console.log(spawnError);
        });
    }
  }
};
