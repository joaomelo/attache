import { initMemoryDb } from '../../interfaces/db';
import { createDummySearch } from '../../interfaces/search';
import { cycleRank } from './cycle';

describe('cycleRank', () => {
  const stakes = [
    {
      pages: ['azure.microsoft.com', 'aws.amazon.com', 'firebase.google.com'],
      terms: ['cloud']
    },
    {
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

  it('snapshots cache is properly passed and not saved again', async () => {
    const dummySearch = createDummySearch();
    const mockSearch = jest.fn(term => dummySearch(term));

    const db = initMemoryDb();
    db.saveStakes(stakes);
    await cycleRank({ db, search: dummySearch });

    await cycleRank({ db, search: mockSearch });

    expect(mockSearch).toHaveBeenCalledTimes(0);
    expect(Object.entries(db.snapshots)).toHaveLength(2);
  });

  it('rankings cache is properly passed and not saved again', async () => {
    const search = createDummySearch();

    const db = initMemoryDb();
    db.saveStakes(stakes);
    await cycleRank({ db, search });

    await cycleRank({ db, search });

    expect(Object.entries(db.rankings)).toHaveLength(7);
  });
});
