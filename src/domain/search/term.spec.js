import { createDummySearch } from '../../interfaces/search';
import { searchTerm } from './term';

describe('searchTerm', () => {
  test('return search results for term', async () => {
    const term = 'service city';
    const search = createDummySearch();

    const searchResult = await searchTerm({ term }, { search });

    expect(searchResult).toEqual(
      expect.objectContaining({
        size: 100,
        results: expect.any(Array)
      })
    );
  });
});
