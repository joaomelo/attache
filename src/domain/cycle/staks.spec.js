import { createDummySearch } from '../interfaces/search';
import { searchTerms } from '../search';
import { rankStakes } from './stakes';

describe('rankStakes', async () => {
  const stakes = [
    {
      frequency: 'daily',
      pages: ['company.com', 'www.landing-page.com'],
      terms: ['service', 'service my-city']
    },
    {
      frequency: 'weekly',
      pages: ['company.com', 'www.competitor.com'],
      terms: ['service', 'service my-neighborough']
    }
  ];
  const terms = new Set(['service', 'service my-city', 'service', 'service my-neighborough']);
  const search = createDummySearch();
  const searches = await searchTerms({ terms }, { search });

  test('return correct report shape', async () => {
    const report = await rankStakes({ stakes, searches });

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
