import { initVanillaDb } from './vanilla';
import { initFirestore } from './firestore';

export function initDb (type) {
  switch (type) {
    case 'vanilla': return initVanillaDb();
    case 'firestore': return initFirestore();
    default: throw new Error(`db type ${type} is invalid`);
  }
}
