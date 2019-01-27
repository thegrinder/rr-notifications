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

const styledComponentsExternal = {
  root: 'styled',
  commonjs2: 'styled-components',
  commonjs: 'styled-components',
  amd: 'styled-components',
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
  externals: {
    react: reactExternal,
    'react-dom': reactDOMExternal,
    'styled-components': styledComponentsExternal,
  },
};

module.exports = prodConfig;
