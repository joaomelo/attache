import { del } from '../../src/interfaces/request';
import { initDb } from '../../src/interfaces/db';

export function createListOfDbInits () {
  const initVanillaDb = () => initDb('vanilla');

  const projectId = process.env.FIREBASE_PROJECT_ID;
  const initFirestoreDb = () => initDb('firestore', { projectId, del });

  const dbTestTable = [
    ['vanilla', initVanillaDb],
    ['firestore', initFirestoreDb]
  ];
  return dbTestTable;
}
