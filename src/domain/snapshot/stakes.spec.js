import { createDummySearch } from '../../interfaces/search';
import { searchStakes } from './stakes';

describe('searchStakes', () => {
  test('return searches results for stakes', async () => {
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

    expect(snapshots).toHaveLength(2);
  });
});
