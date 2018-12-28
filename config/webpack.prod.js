const PATHS = require('./paths');

const prodConfig = {
  mode: 'production',
  devtool: 'source-map',
  entry: [
    PATHS.src,
  ],
  output: {
    path: PATHS.build,
    filename: 'index.js',
    publicPath: '/',
    library: 'rrNotifications',
    libraryTarget: 'umd',
    umdNamedDefine: true,
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
  externals: [
    'react',
    'react-dom',
    'webpack',
  ],
};

module.exports = prodConfig;
