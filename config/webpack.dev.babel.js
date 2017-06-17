import webpack from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';

import { PATHS, baseConfig, baseHtmlPluginConfig,
  basePlugins } from './webpack.base.babel';

const devConfig = {
  entry: [
    'react-hot-loader/patch',
    'webpack-dev-server/client?http://localhost:8080',
    'webpack/hot/only-dev-server',
    PATHS.app,
  ],
  devtool: 'cheap-module-source-map',
  devServer: {
    contentBase: PATHS.build,
    hot: true,
    publicPath: '/',
  },
};

const htmlPlugin = new HtmlWebpackPlugin(baseHtmlPluginConfig);
const hmrePlugin = new webpack.HotModuleReplacementPlugin();

const devPlugins = [htmlPlugin, hmrePlugin];

export default {
  ...baseConfig,
  ...devConfig,
  plugins: basePlugins.concat(devPlugins),
};
