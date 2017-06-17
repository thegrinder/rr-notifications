import webpack from 'webpack';
import PATHS from './paths';

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
    screw_ie8: true,
  },
});

const prodConfig = {
  entry: [
    PATHS.src,
  ],
  output: {
    path: PATHS.build,
    filename: 'index.js',
    publicPath: '/',
  },
  module: {
    rules: [
      {
        test: /\.(js)$/,
        use: 'babel-loader',
        exclude: [
          PATHS.demo,
          /node_modules/,
        ],
      },
    ],
  },
  plugins: [productionPlugin, uglifyJsPlugin],
};

export default prodConfig;
