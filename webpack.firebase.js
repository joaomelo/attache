const path = require('path');
const nodeExternals = require('webpack-node-externals');
const GenerateJsonPlugin = require('generate-json-webpack-plugin');
const pkg = require('./package.json');

const genFirebaseFunctionsPackage = () => ({
  name: 'functions',
  private: true,
  main: 'index.js',
  license: 'MIT',
  engines: {
    node: '14'
  },
  dependencies: pkg.dependencies
});

module.exports = {
  target: 'node',
  mode: 'production',
  entry: './src/main/firebase-services.js',
  externals: [nodeExternals()],
  output: {
    filename: 'index.js',
    path: path.resolve(__dirname, 'dist'),
    libraryTarget: 'commonjs'
  },
  node: {
    __dirname: false,
    __filename: false
  },
  optimization: {
    minimize: false
  },
  plugins: [new GenerateJsonPlugin('package.json', genFirebaseFunctionsPackage())]
};
