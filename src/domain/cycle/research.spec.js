import { createDummySearch } from '../2-interfaces/search';
import { initMemoryDb } from '../2-interfaces/db';
import { research } from './research';

describe('research', () => {
  let db;
  const search = createDummySearch();
  const stake = {
    frequency: 'daily',
    pages: ['company.com', 'www.landing-page.com'],
    terms: ['service', 'service my-city']
  };

  beforeEach(() => {
    db = initMemoryDb();
  });

  test('return correct report shape', async () => {
    const report = await research({ stake }, { search, db });

    expect(report).toHaveLength(4);

    expect(report).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          page: expect.any(String),
          term: expect.any(String),
          position: expect.any(Number),
          size: expect.any(Number),
          when: expect.any(Date)
        })
      ])
    );
  });

  test('will not repeat research if frequency already answered', async () => {
    await research({ stake }, { search, db });
    const length = db.rankings.length;

    await research({ stake }, { search, db });

    expect(db.rankings).toHaveLength(length);
  });

  test('can deal with partial diferences in parameters', async () => {
    await research({ stake }, { search, db });
    const length = db.rankings.length;

    const newStake = {
      frequency: 'weekly',
      pages: ['company.com', 'www.landing-page.com', 'new-page.net'],
      terms: ['service', 'service my-city']
    };
    await research({ stake: newStake }, { search, db });

    expect(db.rankings).toHaveLength(length + 2);
  });
});
