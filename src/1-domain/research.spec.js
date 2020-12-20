import { dummySearcher } from '../2-services/search';
import { createDummyDb } from '../2-services/db';
import { research } from './research';

describe('research', () => {
  const stake = {
    frequency: 'daily',
    pages: ['company.com', 'www.landing-page.com'],
    terms: ['service', 'service my-city']
  };

  test('return correct report shape', async () => {
    const report = await research(
      { stake, size: 1000 },
      { searcher: dummySearcher, db: createDummyDb() }
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
    const db = createDummyDb();
    await research({ stake, size: 1000 }, { searcher: dummySearcher, db });
    const length = db.rankings.length;

    await research({ stake, size: 1000 }, { searcher: dummySearcher, db });

    expect(db.rankings).toHaveLength(length);
  });

  test('can distinguish partial presence of rankings ', async () => {
    const db = createDummyDb();
    await research({ stake, size: 1000 }, { searcher: dummySearcher, db });
    const length = db.rankings.length;

    const newStake = {
      frequency: 'daily',
      pages: ['company.com', 'www.landing-page.com', 'new-page.net'],
      terms: ['service', 'service my-city']
    };
    await research({ stake: newStake, size: 1000 }, { searcher: dummySearcher, db });

    expect(db.rankings).toHaveLength(length + 2);
  });
});
