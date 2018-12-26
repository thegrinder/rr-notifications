module.exports = {
  presets: [
    '@babel/preset-env',
    '@babel/preset-react',
  ],
  plugins: [
    '@babel/plugin-proposal-export-default-from',
    '@babel/plugin-proposal-object-rest-spread',
    '@babel/plugin-syntax-export-namespace-from',
    '@babel/plugin-transform-runtime',
  ],
};