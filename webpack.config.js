const path = require('path');

const PATHS = {
  src: path.join(__dirname, 'src'),
  build: path.join(__dirname, 'dist'),
};

const reactExternal = {
  root: 'React',
  commonjs2: 'react',
  commonjs: 'react',
  amd: 'react',
};

const reactDOMExternal = {
  root: 'ReactDOM',
  commonjs2: 'react-dom',
  commonjs: 'react-dom',
  amd: 'react-dom',
};

const prodConfig = {
  mode: 'production',
  devtool: 'source-map',
  entry: [PATHS.src],
  output: {
    path: PATHS.build,
    filename: 'index.js',
    publicPath: '/',
    library: 'rrNotifications',
    libraryTarget: 'umd',
    umdNamedDefine: true,
    globalObject: 'this',
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.json'],
  },
  module: {
    rules: [
      {
        test: /\.(ts|js)x?$/,
        use: 'babel-loader',
        exclude: [/node_modules/],
      },
    ],
  },
  externals: {
    react: reactExternal,
    'react-dom': reactDOMExternal,
  },
};

module.exports = prodConfig;
