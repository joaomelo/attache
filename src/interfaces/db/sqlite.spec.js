import { initSqliteDB } from './sqlite';

describe('sqlite adapter', () => {
  test('must save and retrieve stakes', async () => {
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

    const db = await initSqliteDB({ memory: true });
    await db.saveStakes(stakes);
    const retrievedStakes = await db.queryStakes();

    expect(retrievedStakes).toEqual(stakes);
  });

  test('must save and retrieve rankings', async () => {
    const rankings = [
      {
        page: expect.any(String),
        term: expect.any(String),
        position: expect.any(Number),
        size: expect.any(Number),
        when: expect.any(Date)
      }
    ];

    const db = await initSqliteDB({ memory: true });
    await db.saveStakes(stakes);
    const retrievedStakes = await db.queryStakes();

    expect(retrievedStakes).toEqual(stakes);
  });
});
