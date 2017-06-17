import path from 'path';

export const PATHS = {
  src: path.join(__dirname, '..', 'src'),
  build: path.join(__dirname, '..', 'dist'),
};

export const baseHtmlPluginConfig = {
  template: path.join(__dirname + '/../src/index.html'),
  filename: 'index.html',
  inject: 'body',
};

export const baseConfig = {
  entry: [
    PATHS.src,
  ],
  resolve: {
    modules: [ path.resolve(__dirname, PATHS.src), 'node_modules' ]
  },
  output: {
    path: PATHS.build,
    filename: 'index_bundle.js',
    publicPath: '/',
  },
  context: PATHS.src,
  module: {
    rules: [
      { test: /\.(js)$/, use: 'babel-loader' },
    ],
  },
};

export const basePlugins = [];
