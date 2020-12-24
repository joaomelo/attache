import { createDummySearch } from '../../interfaces/search';
import { searchStakes } from '../search';
import { rankStakes } from './stakes';

describe('rankStakes', () => {
  test('return correct rankings quantity', async () => {
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

    expect(rankings).toHaveLength(3);
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

    expect(rankings).toHaveLength(1);
  });
});
