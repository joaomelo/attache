import { createDummySearch } from '../../interfaces/search';
import { searchTerm } from './term';

describe('searchTerm', () => {
  const term = 'service city';

  test('return search snapshot for term', async () => {
    const search = createDummySearch();

    const snapshot = await searchTerm({ term }, { search });

    expect(snapshot).toEqual(
      expect.objectContaining({
        id: expect.any(String),
        term,
        when: expect.any(Date),
        success: true,
        size: 100,
        result: expect.any(Array)
      })
    );
  });

  test('avoid search service if cached snapshot is available for today', async () => {
    const dummySearch = createDummySearch();
    const search = jest.fn(term => dummySearch(term));
    const cache = [{
      term,
      when: new Date(),
      success: true,
      size: 2,
      result: ['www.some-page.com', 'www.another-page.net']
    }];

    await searchTerm({ term, cache }, { search });

    expect(search).toHaveBeenCalledTimes(0);
  });

  test('ignores failed cached snapshots', async () => {
    const dummySearch = createDummySearch();
    const search = jest.fn(term => dummySearch(term));
    const cache = [{
      term,
      when: new Date(),
      success: false,
      size: 2
    }];

    await searchTerm({ term, cache }, { search });

    expect(search).toHaveBeenCalledTimes(1);
  });

  test('returns a failed snapshot if search throws', async () => {
    const search = async () => { throw new Error('some search error'); };

    const snapshot = await searchTerm({ term }, { search });

    expect(snapshot).toEqual(
      expect.objectContaining({
        term,
        success: false,
        error: expect.any(String),
        when: expect.any(Date)
      })
    );
  });

  test('returns a failed snapshot if search data is out of spec', async () => {
    const search = async () => { return { size: 100 }; };

    const snapshot = await searchTerm({ term }, { search });

    expect(snapshot).toEqual(
      expect.objectContaining({
        term,
        success: false,
        error: expect.any(String),
        when: expect.any(Date)
      })
    );
  });
});
