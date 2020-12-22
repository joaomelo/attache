import { initMemoryDb } from '../../interfaces/db';
import { createDummySearch } from '../../interfaces/search';
import { cycleRank } from './rank';

describe('cycleRank', () => {
  const search = createDummySearch();

  it('save rankings for all stakes', async () => {
    const db = initMemoryDb();
    db.stakes.push(
      {
        pages: ['company.com', 'www.competitor.com'],
        terms: ['service', 'service my-city']
      },
      {
        pages: ['www.competitor.com'],
        terms: ['service', 'service my-neighborough']
      }
    );

    await cycleRank({ db, search });

    expect(db.rankings).toHaveLength(5);
  });
});
