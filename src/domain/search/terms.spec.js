import { createDummySearch } from '../../interfaces/search';
import { searchTerms } from './terms';

describe('searchTerms', () => {
  test('return searches results for a set of terms', async () => {
    const terms = new Set(['service', 'service my-city', 'service', 'service my-neighborough']);
    const search = createDummySearch();

    const searchesResults = await searchTerms({ terms }, { search });

    expect(searchesResults).toHaveLength(3);
  });
});
