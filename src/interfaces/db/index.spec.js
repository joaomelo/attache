import { calcToday } from '../../helpers';
import { initMemoryDb } from './memory';
import { initNedb } from './nedb';

describe('db adapters', () => {
  const memory = () => initMemoryDb();
  const nedb = () => initNedb({ memory: true });

  const today = calcToday();
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);

  const stakes = [
    {
      id: '87178090-383e-4780-a363-a076a6f952dd',
      frequency: 'daily',
      pages: ['azure.microsoft.com', 'aws.amazon.com', 'firebase.google.com'],
      terms: ['cloud']
    },
    {
      id: 'd1584b65-7361-46ee-a807-e1a3ec0ddb33',
      frequency: 'weekly',
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

  const testTableSaveAndQuery = [
    ['Stakes', memory, stakes],
    ['Stakes', nedb, stakes],
    ['Rankings', memory, rankings],
    ['Rankings', nedb, rankings],
    ['Snapshots', memory, snapshots],
    ['Snapshots', nedb, snapshots]
  ];

  test.each(testTableSaveAndQuery)('save and query %p with %p', async (dbMethod, initDb, fixture) => {
    const db = await initDb();

    const result = await db[`save${dbMethod}`](fixture);
    const retrieved = await db[`query${dbMethod}`]();

    const sortById = (a, b) => {
      if (a.id < b.id) return -1;
      if (a.id > b.id) return 1;
      return 0;
    };
    retrieved.sort(sortById);
    fixture.sort(sortById);

    expect(result).toBe(true);
    expect(retrieved).toEqual(fixture);
  });

  const testTableQuerySince = [
    ['Rankings', memory, rankings, 2],
    ['Rankings', nedb, rankings, 2],
    ['Snapshots', memory, snapshots, 2],
    ['Snapshots', nedb, snapshots, 2]
  ];
  test.each(testTableQuerySince)('query %p using date filter with %p', async (dbMethod, initDb, fixture, length) => {
    const db = await initDb();
    await db[`save${dbMethod}`](fixture);

    const todayItems = await db[`query${dbMethod}Since`](today);

    expect(todayItems).toHaveLength(length);
  });
});
