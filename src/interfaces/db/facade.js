import { initVanillaDb } from './vanilla';
import { initMongo } from './mongo';

export function initDb (type, options) {
  switch (type) {
    case 'vanilla': return initVanillaDb(options);
    case 'mongo': return initMongo(options);
    default: throw new Error(`db type ${type} is invalid`);
  }
}
