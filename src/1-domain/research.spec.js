import { dummySearcher } from '../2-interfaces/search';
import { initMemoryDb } from '../2-interfaces/db';
import { research } from './research';

describe('research', () => {
  const stake = {
    frequency: 'daily',
    pages: ['company.com', 'www.landing-page.com'],
    terms: ['service', 'service my-city']
  };

  test('return correct report shape', async () => {
    const report = await research(
      { stake },
      { searcher: dummySearcher, db: initMemoryDb() }
    );

    expect(report).toHaveLength(4);

    expect(report).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          page: expect.any(String),
          term: expect.any(String),
          position: expect.any(Number),
          when: expect.any(Date)
        })
      ])
    );
  });

  test('will not repeat research if frequency already answered', async () => {
    const db = initMemoryDb();
    await research({ stake }, { searcher: dummySearcher, db });
    const length = db.rankings.length;

    await research({ stake }, { searcher: dummySearcher, db });

    expect(db.rankings).toHaveLength(length);
  });

  test('can deal with partial diferences in parameters', async () => {
    const db = initMemoryDb();
    await research({ stake }, { searcher: dummySearcher, db });
    const length = db.rankings.length;

    const newStake = {
      frequency: 'weekly',
      pages: ['company.com', 'www.landing-page.com', 'new-page.net'],
      terms: ['service', 'service my-city']
    };
    await research({ stake: newStake }, { searcher: dummySearcher, db });

    expect(db.rankings).toHaveLength(length + 2);
  });
});
