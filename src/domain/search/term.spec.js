import { createDummySearch } from '../../interfaces/search';
import { searchTerm } from './term';

describe('searchTerm', () => {
  test('return search snapshot for term', async () => {
    const term = 'service city';
    const search = createDummySearch();

    const snapshot = await searchTerm({ term }, { search });

    expect(snapshot).toEqual(
      expect.objectContaining({
        term,
        when: expect.any(Date),
        success: true,
        size: 100,
        result: expect.any(Array)
      })
    );
  });

  test('returns a failed snapshot if search throws', async () => {
    const term = 'service';
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
    const term = 'service';
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
