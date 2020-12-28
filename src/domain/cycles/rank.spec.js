import { initMemoryDb } from '../../interfaces/db';
import { createDummySearch } from '../../interfaces/search';
import { cycleRank } from './rank';

describe('cycleRank', () => {
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

  it('returns rankings and snapshots for all stakes', async () => {
    const search = createDummySearch();
    const db = initMemoryDb();
    db.saveStakes(stakes);

    const { rankings, snapshots } = await cycleRank({ db, search });

    expect(Object.entries(rankings)).toHaveLength(7);
    expect(Object.entries(snapshots)).toHaveLength(2);
  });

  it('save rankings and snapshots for all stakes', async () => {
    const search = createDummySearch();
    const db = initMemoryDb();
    db.saveStakes(stakes);

    await cycleRank({ db, search });

    expect(Object.entries(db.rankings)).toHaveLength(7);
    expect(Object.entries(db.snapshots)).toHaveLength(2);
  });

  it('snapshots cache is properly managed', async () => {
    const dummySearch = createDummySearch();
    const mockSearch = jest.fn(term => dummySearch(term));

    const db = initMemoryDb();
    db.saveStakes(stakes);
    await cycleRank({ db, search: dummySearch });

    await cycleRank({ db, search: mockSearch });

    expect(mockSearch).toHaveBeenCalledTimes(0);
  });
});
