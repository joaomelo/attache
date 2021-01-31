import 'core-js/stable';
import 'regenerator-runtime/runtime';
import loadEnvironmentVariables from '../../env-loader';

loadEnvironmentVariables({ jest: true, env: process.env.NODE_ENV });
