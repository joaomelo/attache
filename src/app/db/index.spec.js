import { snapshots as items } from '../../../tests/fixtures';
import { fromToday, sortByField } from '../../helpers';
import { del } from '../request';
import { initDb } from './index';

describe('db module', () => {
  const collectionName = 'items';
  const dbTestTable = createListOfDbInits();

  describe.each(dbTestTable)('%p db', (type, initFn) => {
    test('save and query items', async () => {
      const db = await initFn();

      const result = await db.saveItems(collectionName, items);
      const retrieved = await db.queryAllItems(collectionName);

      const fixtureSorted = sortByField(items, 'id');
      const retrievedSorted = sortByField(retrieved, 'id');

      expect(result).toBe(true);
      expect(retrievedSorted).toEqual(fixtureSorted);
    });

    test('query using date filter', async () => {
      const db = await initFn();
      await db.saveItems(collectionName, items);

      const retrieved = await db.queryItemsSince(collectionName, fromToday(-1));
      expect(retrieved).toHaveLength(3);
    });

    const saveEmptyDataTable = [
      ['empty array', []],
      ['undefined', undefined]
    ];
    test.each(saveEmptyDataTable)('deals with saving %p gracefully', async (description, data) => {
      const db = await initFn();
      await db.saveItems(collectionName, data);
      const retrieved = await db.queryAllItems(collectionName);
      expect(retrieved).toEqual([]);
    });
  });

  describe('exception scenarios', () => {
    test('throws if wrong db type passed to initialization', () => {
      expect(() => initDb('wrong-type')).toThrow();
      expect(() => initDb()).toThrow();
    });
  });
});

function createListOfDbInits () {
  const dbTestTable = [
    ['vanilla', () => initDb('vanilla')]
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