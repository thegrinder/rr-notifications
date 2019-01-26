const path = require('path');

const PATHS = {
  src: path.join(__dirname, 'src'),
  build: path.join(__dirname, 'dist'),
};


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
          /node_modules/,
        ],
      },
    ],
  },
  externals: [
    'react',
    'react-dom',
    'styled-components',
  ],
};

module.exports = prodConfig;
