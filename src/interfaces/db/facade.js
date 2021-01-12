import { initVanillaDb } from './vanilla';
import { initNedb } from './nedb';

export function initDb (type, options) {
  switch (type) {
    case 'vanilla': return initVanillaDb(options);
    case 'nedb': return initNedb(options);
    case 'firestore': return {};
    default: throw new Error(`db type ${type} is invalid`);
  }
}
