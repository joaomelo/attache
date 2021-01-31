const path = require('path');
const webpack = require('webpack');
const dotenv = require('dotenv');
const Dotenv = require('dotenv-webpack');

/*

  this will load environment variables considering the needs of the different tools
  and environments

*/
const envDevFile = path.resolve(__dirname, 'env-dev.env');

module.exports = function loadEnvironmentVariables (envArgs) {
  const consumer = establishConsumerCase(envArgs);
  switch (consumer) {
    case 'JEST_DEV':
    case 'JEST_PROD_LOCAL': return loadFromEnvDevFile(true);
    case 'JEST_PROD_CI': return;
    case 'WEBPACK_DEV': return createPluginToLoadFromEnvDevFile();
    case 'WEBPACK_PROD_LOCAL': return createPluginReducingFromEnvDevFile();
    case 'WEBPACK_PROD_CI': return createPluginFromEnvInMemory();
    default: return console.info('no environment variable case was determined');
  }
};

function establishConsumerCase (envArgs) {
  if (envArgs.jest && envArgs.env === 'dev') return 'JEST_DEV';
  if (envArgs.jest && envArgs.env === 'prodLocal') return 'JEST_PROD_LOCAL';
  if (envArgs.jest && envArgs.env === 'prodCi') return 'JEST_PROD_CI';
  if (envArgs.WEBPACK_BUNDLE && envArgs.dev) return 'WEBPACK_DEV';
  if (envArgs.WEBPACK_BUNDLE && envArgs.prodLocal) return 'WEBPACK_PROD_LOCAL';
  if (envArgs.WEBPACK_BUNDLE && envArgs.prodCi) return 'WEBPACK_PROD_CI';
}

function loadFromEnvDevFile (isSilent = false) {
  if (!isSilent) console.info(`attempting to load env vars from "${envDevFile}" file`);
  dotenv.config({ path: envDevFile });
}

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
