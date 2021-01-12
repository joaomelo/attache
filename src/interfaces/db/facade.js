import { initVanillaDb } from './vanilla';
import { initNedb } from './nedb';
import { initFirestore } from './firestore';

export function initDb (type, options) {
  switch (type) {
    case 'vanilla': return initVanillaDb(options);
    case 'nedb': return initNedb(options);
    case 'firestore': return initFirestore(options);
    default: throw new Error(`db type ${type} is invalid`);
  }
}
