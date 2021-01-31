const path = require('path');
const nodeExternals = require('webpack-node-externals');
const GenerateJsonPlugin = require('generate-json-webpack-plugin');
const loadEnvironmentVariables = require('./env-loader');
const pkg = require('./package.json');

module.exports = (env, argv) => {
  const envPlugin = loadEnvironmentVariables(env);

  return {
    target: 'node',
    mode: env.dev ? 'development' : 'production',
    entry: './src/main/services.js',
    externals: [nodeExternals()],
    output: {
      filename: 'index.js',
      path: path.resolve(__dirname, 'dist'),
      libraryTarget: 'commonjs'
    },
    watch: env.dev,
    node: {
      __dirname: false,
      __filename: false
    },
    optimization: {
      minimize: false
    },
    plugins: [
      envPlugin,
      new GenerateJsonPlugin('package.json', genFirebaseFunctionsPackage())
    ]
  };
};

function genFirebaseFunctionsPackage () {
  return {
    name: 'functions',
    private: true,
    main: 'index.js',
    license: 'MIT',
    engines: {
      node: '14'
    },
    dependencies: pkg.dependencies
  };
};
