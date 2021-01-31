const path = require('path');
const webpack = require('webpack');
const Dotenv = require('dotenv-webpack');
const nodeExternals = require('webpack-node-externals');
const GenerateJsonPlugin = require('generate-json-webpack-plugin');
const pkg = require('./package.json');

module.exports = (env, argv) => {
  const envPlugin = createEnvVariablesPlugin(env);

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

function createEnvVariablesPlugin (envArgs) {
  const envCase = establishEnvironment(envArgs);
  switch (envCase) {
    case 'WEBPACK_DEV': return createPluginToLoadFromEnvDevFile();
    case 'WEBPACK_PROD_LOCAL': return createPluginReducingFromEnvDevFile();
    case 'WEBPACK_PROD_CI': return createPluginFromEnvInMemory();
    default: return console.info('no environment variable case was determined');
  }
};

function establishEnvironment (envArgs) {
  if (envArgs.WEBPACK_BUNDLE && envArgs.dev) return 'WEBPACK_DEV';
  if (envArgs.WEBPACK_BUNDLE && envArgs.prodLocal) return 'WEBPACK_PROD_LOCAL';
  if (envArgs.WEBPACK_BUNDLE && envArgs.prodCi) return 'WEBPACK_PROD_CI';
  return 'UNDEFINED';
}

const envDevFile = path.resolve(process.cwd(), 'env-dev.env');

function createPluginToLoadFromEnvDevFile () {
  console.info(`attempting to inject env vars from "${envDevFile}" file using webpack plugin`);
  const dotEnvPlugin = new Dotenv({ path: envDevFile });
  return dotEnvPlugin;
}

function createPluginReducingFromEnvDevFile () {
  console.info(`attempting to inject env vars reducing from "${envDevFile}" file using webpack plugin`);
  const dotEnvPlugin = new Dotenv({ path: envDevFile });

  delete dotEnvPlugin.definitions['process.env.FIREBASE_PROJECT_ID'];
  // the removal of emulator env variable is critical to the productions app
  // since firebase node sdk automatically attempts connection to emulator host
  // if variable is set
  delete dotEnvPlugin.definitions['process.env.FIRESTORE_EMULATOR_HOST'];

  return dotEnvPlugin;
}

function createPluginFromEnvInMemory () {
  console.info('attempting to inject env vars from memory using webpack plugin');
  const dotEnvPlugin = new webpack.DefinePlugin({
    'process.env.SCALE_SERP_KEY': JSON.stringify(process.env.SCALE_SERP_KEY)
  });
  return dotEnvPlugin;
}
