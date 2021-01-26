import { calcSomedayFromToday, sortByField } from '../../src/helpers';
import { initDb } from '../../src/interfaces/db';
import { createListOfDbInits } from '../helpers';

describe('db module', () => {
  const { stakes, rankings, snapshots } = createFixtures();

  const dbTestTable = createListOfDbInits();
  describe.each(dbTestTable)('%p db', (type, initFn) => {
    const saveAndQueryTestTable = [
      ['Stakes', stakes],
      ['Rankings', rankings],
      ['Snapshots', snapshots]
    ];
    test.each(saveAndQueryTestTable)('save and query %p', async (dbMethod, fixture) => {
      const db = await initFn();

      const result = await db[`save${dbMethod}`](fixture);
      const retrieved = await db[`query${dbMethod}`]();

      const fixtureSorted = sortByField(fixture, 'id');
      const retrievedSorted = sortByField(retrieved, 'id');

      expect(result).toBe(true);
      expect(retrievedSorted).toEqual(fixtureSorted);
    });

    const deleteTestTable = [
      ['Stake', stakes, '87178090-383e-4780-a363-a076a6f952dd']
    ];
    test.each(deleteTestTable)('delete %p', async (dbMethod, fixture, idToDelete) => {
      const db = await initFn();
      await db[`save${dbMethod}s`](fixture);
      const retrievedBefore = await db[`query${dbMethod}s`]();

      await db[`delete${dbMethod}`](idToDelete);

      const after = await db[`query${dbMethod}s`]();
      const deletedIndex = after.findIndex(record => record.id === idToDelete);

      expect(retrievedBefore.length).toBe(after.length + 1);
      expect(deletedIndex).toBe(-1);
    });

    const querySinceTestTable = [
      ['Rankings', rankings, 2],
      ['Snapshots', snapshots, 2]
    ];
    test.each(querySinceTestTable)('query %p using date filter', async (dbMethod, fixture, expectedLength) => {
      const db = await initFn();
      await db[`save${dbMethod}`](fixture);
    });

    const saveEmptyDataTable = [
      ['empty array', []],
      ['undefined', undefined]
    ];
    test.each(saveEmptyDataTable)('deals with saving %p gracefully', async (description, data) => {
      const db = await initFn();
      await db.saveStakes(data);
      const stakes = await db.queryStakes();
      expect(stakes).toEqual([]);
    });
  });

  describe('exception scenarios', () => {
    test('throws if wrong db type passed to initialization', () => {
      expect(() => initDb('wrong-type')).toThrow();
      expect(() => initDb()).toThrow();
    });
  });
});

function createFixtures () {
  const yesterday = calcSomedayFromToday(-1);

  const stakes = [
    {
      id: '87178090-383e-4780-a363-a076a6f952dd',
      pages: ['azure.microsoft.com', 'aws.amazon.com', 'firebase.google.com'],
      terms: ['cloud']
    },
    {
      id: 'd1584b65-7361-46ee-a807-e1a3ec0ddb33',
      pages: ['vuejs.org', 'reactjs.org', 'angular.io', 'svelte.dev'],
      terms: ['js front end library']
    }
  ];

  const rankings = [
    {
      id: '2b42f744-b9e1-41f5-acfe-8db4a54d1e97',
      page: 'www.company.com',
      term: 'service',
      position: 1,
      size: 100,
      when: new Date()
    },
    {
      id: 'fdb6df70-43d9-4388-a633-7d69555ece0b',
      page: 'www.competitor.com',
      term: 'service',
      position: -1,
      size: 100,
      when: new Date()
    },
    {
      id: '09bba01d-ea07-4283-b2f8-9bb4eefab802',
      page: 'www.competitor.com',
      term: 'service',
      position: 99,
      size: 100,
      when: yesterday
    }
  ];

  const snapshots = [
    {
      id: '304145c3-b694-431b-8f19-0ce6f678e3c0',
      term: 'cloud',
      when: new Date(1789, 6, 14),
      success: true,
      size: 2,
      result: ['www.some-page.com', 'www.another-page.net']
    },
    {
      id: 'd0efdeb3-919b-4bc6-aaff-c845afa5c55a',
      term: 'service my-city',
      when: yesterday,
      success: false,
      error: 'quota exceeded',
      size: 2
    },
    {
      id: '2fb25055-af54-4611-8dd9-e1cdc700929b',
      term: 'js front end library',
      when: new Date(),
      success: true,
      size: 2,
      result: ['www.some-page.com', 'www.another-page.net']
    },
    {
      id: '37ef78fb-6d23-48b6-adc9-336e1ce122f1',
      term: 'service',
      when: new Date(),
      success: true,
      size: 2,
      result: ['www.some-page.com', 'www.another-page.net']
    }
  ];

  return { stakes, rankings, snapshots };
}
