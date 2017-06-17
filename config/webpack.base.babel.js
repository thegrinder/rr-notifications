import path from 'path';

export const PATHS = {
  app: path.join(__dirname, '..', 'app'),
  build: path.join(__dirname, '..', 'dist'),
};

export const baseHtmlPluginConfig = {
  template: path.join(__dirname + '/../app/index.html'),
  filename: 'index.html',
  inject: 'body',
};

export const baseConfig = {
  entry: [
    PATHS.app,
  ],
  resolve: {
    modules: [ path.resolve(__dirname, PATHS.app), 'node_modules' ]
  },
  output: {
    path: PATHS.build,
    filename: 'index_bundle.js',
    publicPath: '/',
  },
  context: PATHS.app,
  module: {
    rules: [
      { test: /\.(js)$/, use: 'babel-loader' },
    ],
  },
};

export const basePlugins = [];
