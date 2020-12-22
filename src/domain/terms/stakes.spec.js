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
      terms: ['service', 'service my-city']
    }
  ];

  test('return search results for stakes', async () => {
    const search = createDummySearch();

    const searchResults = await searchStakes({ term }, { search });

    expect(searchResult).toEqual(
      expect.objectContaining({
        size: 100,
        results: expect.any(Array)
      })
    );
  });
});
