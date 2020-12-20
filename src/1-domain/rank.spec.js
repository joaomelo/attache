import { dummySearcher } from '../2-services/search';
import { rank } from './rank';

describe('rank', () => {
  test('return page ranking for given term', async () => {
    const page = 'company.com';
    const term = 'service city';

    const ranking = await rank({ page, term, size: 1000 }, { searcher: dummySearcher });

    expect(ranking).toEqual(
      expect.objectContaining({
        page,
        term,
        position: expect.any(Number),
        when: expect.any(Date)
      })
    );
  });
});
