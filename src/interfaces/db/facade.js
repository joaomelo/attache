import { initVanillaDb } from './vanilla';
import { initFirestore } from './firestore';

export function initDb (type, options) {
  switch (type) {
    case 'vanilla': return initVanillaDb(options);
    case 'firestore': return initFirestore(options);
    default: throw new Error(`db type ${type} is invalid`);
  }
}
