import { initMemoryDb } from '../2-interfaces/db';
import { dummySearcher } from '../2-interfaces/search';
import { runCycle } from './cycle';

describe('cycle', () => {
  it('research rankings for all stakes in "parallel"', async () => {
    const db = initMemoryDb();
    db.stakes.push(
      {
        frequency: 'daily',
        pages: ['company.com', 'www.landing-page.com'],
        terms: ['service', 'service my-city']
      },
      {
        frequency: 'weekly',
        pages: ['company.com', 'www.competitor.com'],
        terms: ['service', 'service my-city']
      }
    );

    await runCycle({ db, searcher: dummySearcher });

    expect(db.rankings).toHaveLength(8);
  });

  it('but subsequent cycles will enjoy previous runs rankings', async () => {
    const db = initMemoryDb();
    db.stakes.push({
      frequency: 'daily',
      pages: ['company.com', 'www.landing-page.com'],
      terms: ['service', 'service my-city']
    });

    await runCycle({ db, searcher: dummySearcher });

    db.stakes.push({
      frequency: 'weekly',
      pages: ['company.com', 'www.competitor.com'],
      terms: ['service', 'service my-city']
    });

    await runCycle({ db, searcher: dummySearcher });

    expect(db.rankings).toHaveLength(6);
  });
});
