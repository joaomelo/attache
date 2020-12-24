import { createDummySearch } from '../../interfaces/search';
import { searchStakes } from '../search';
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
    const search = createDummySearch();
    const snapshots = await searchStakes({ stakes }, { search });

    const rankings = rankStakes({ stakes, snapshots });

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

  test('will not rank against failed term searches', async () => {
    const stakes = [
      {
        frequency: 'weekly',
        pages: ['www.competitor.com'],
        terms: ['service', 'service city']
      }
    ];

    const correctSearch = createDummySearch();
    const failingSearch = term => (term === 'service')
      ? { result: false }
      : correctSearch(term);
    const snapshots = await searchStakes({ stakes }, { search: failingSearch });

    const rankings = rankStakes({ stakes, snapshots });

    expect(rankings.size).toBe(1);
  });
});
