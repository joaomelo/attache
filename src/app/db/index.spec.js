import { snapshots as items } from '../../../tests/fixtures';
import { fromToday, sortByField } from '../../helpers';
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

    const exceptionsDataTable = [
      ['empty array', []],
      ['undefined', undefined]
    ];
    test.each(exceptionsDataTable)('deals with saving %p gracefully', async (description, data) => {
      const db = await initFn();
      await db.saveItems(collectionName, data);
      const retrieved = await db.queryAllItems(collectionName);
      expect(retrieved).toEqual([]);
    });

    test('should provide an id if none is given', async () => {
      const name = 'i do not have an id';
      const itemsWithoutId = [{ name }];
      const db = await initFn();

      await db.saveItems(collectionName, itemsWithoutId);

      const retrieved = await db.queryAllItems(collectionName);
      expect(retrieved).toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            id: expect.any(String),
            name
          })
        ])
      );
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

  // only unit test firestore if emulator is running
  if (process.env.FIRESTORE_EMULATOR_HOST) {
    const initFirestoreDb = () => initDb('firestore');
    dbTestTable.push(['firestore', initFirestoreDb]);
  }

  return dbTestTable;
}
