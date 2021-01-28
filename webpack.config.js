const path = require('path');
const nodeExternals = require('webpack-node-externals');
const GenerateJsonPlugin = require('generate-json-webpack-plugin');
const Dotenv = require('dotenv-webpack');
const pkg = require('./package.json');

module.exports = (env, argv) => {
  const envFileName = `env-${env.prod ? 'prod' : 'dev'}.env`;
  const pathToEnv = path.resolve(__dirname, envFileName);

  return {
    target: 'node',
    mode: 'production',
    entry: './src/main/service-snapshot.js',
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
    plugins: [
      new GenerateJsonPlugin('package.json', genFirebaseFunctionsPackage()),
      new Dotenv({ path: pathToEnv })
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
