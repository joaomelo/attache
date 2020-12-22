import { createDummySearch } from '../../interfaces/search';
import { searchStakes } from './stakes';

describe('searchStakes', () => {
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

  test('return searches results for stakes', async () => {
    const search = createDummySearch();
    const searchesResults = await searchStakes({ stakes }, { search });
    expect(searchesResults).toHaveLength(3);
  });
});
