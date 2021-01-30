import 'core-js/stable';
import 'regenerator-runtime/runtime';
import dotenv from 'dotenv';

const isProd = process.env.NODE_ENV = 'prod';
const path = `./env-${isProd ? 'prod' : 'dev'}.env`;

dotenv.config({ path });
