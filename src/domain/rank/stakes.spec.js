import { createDummySearch } from '../../interfaces/search';
import { searchTerms } from '../search';
import { rankStakes } from './stakes';

describe('rankStakes', () => {
  test('return correct rankings quantity and shape', async () => {
    const stakes = [
      {
        frequency: 'daily',
        pages: ['company.com', 'www.competitor.com'],
        terms: ['service']
      },
      {
        frequency: 'weekly',
        pages: ['www.competitor.com'],
        terms: ['service', 'service city']
      }
    ];
    const terms = new Set(['service', 'service city']);
    const search = createDummySearch();
    const contexts = await searchTerms({ terms }, { search });

    const rankings = await rankStakes({ stakes, contexts });

    expect(rankings.size).toBe(3);
    expect(Array.from(rankings.values())).toEqual(
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
});
