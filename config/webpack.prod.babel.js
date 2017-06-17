import webpack from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';

import { baseConfig, baseHtmlPluginConfig, basePlugins } from './webpack.base.babel';

const htmlPlugin = new HtmlWebpackPlugin({
  ...baseHtmlPluginConfig,
});
const productionPlugin = new webpack.DefinePlugin({
  'process.env': {
    NODE_ENV: JSON.stringify(process.env.NODE_ENV),
  },
});
const uglifyJsPlugin = new webpack.optimize.UglifyJsPlugin({
    comments: false,
    beautify: false,
    mangle: {
    screw_ie8: true,
    keep_fnames: true,
    },
    compress: {
      screw_ie8: true
    },
});
const prodPlugins = [htmlPlugin, productionPlugin, uglifyJsPlugin];

export default {
  ...baseConfig,
  plugins: basePlugins.concat(prodPlugins),
};
