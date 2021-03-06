import 'core-js/stable';
import 'regenerator-runtime/runtime';
import path from 'path';
import dotenv from 'dotenv';

const envDevFile = path.resolve(process.cwd(), '.env');
dotenv.config({ path: envDevFile });
