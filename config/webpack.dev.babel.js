import webpack from 'webpack';
import path from 'path';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import PATHS from './paths';

const htmlPlugin = new HtmlWebpackPlugin({
  template: path.join(`${__dirname}/../demo/index.html`),
  filename: 'index.html',
  inject: 'body',
});
const hmrePlugin = new webpack.HotModuleReplacementPlugin();

const devConfig = {
  entry: [
    'react-hot-loader/patch',
    'webpack-dev-server/client?http://localhost:8080',
    'webpack/hot/only-dev-server',
    PATHS.demo,
  ],
  output: {
    path: PATHS.build,
    filename: 'index.js',
    publicPath: '/',
  },
  context: PATHS.demo,
  devtool: 'cheap-module-source-map',
  devServer: {
    contentBase: PATHS.build,
    hot: true,
    publicPath: '/',
  },
  module: {
    rules: [
      {
        test: /\.(js)$/,
        use: 'babel-loader',
        exclude: [/node_modules/],
      },
    ],
  },
  plugins: [htmlPlugin, hmrePlugin],
};

export default devConfig;
