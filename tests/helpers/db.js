import { del } from '../../src/app/request';
import { initDb } from '../../src/app/db';

export function createListOfDbInits () {
  const initVanillaDb = () => initDb('vanilla');

  const dbTestTable = [
    ['vanilla', initVanillaDb]
  ];

  const shouldEmulatorBeRunning = process.env.FIRESTORE_EMULATOR_HOST &&
    process.env.FIREBASE_PROJECT_ID;
  if (shouldEmulatorBeRunning) {
    const projectId = process.env.FIREBASE_PROJECT_ID;
    const initFirestoreDb = () => initDb('firestore', { projectId, del });
    dbTestTable.push(['firestore', initFirestoreDb]);
  }

  return dbTestTable;
}
