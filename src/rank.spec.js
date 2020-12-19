import { rank } from './rank';

describe('rank', () => {
  test('return page ranking for given term', () => {
    const page = 'company.com';
    const term = 'service city';

    const searcher = (term, size) => {
      const result = Array(size).fill('www.site.com');
      result[10] = 'company.com';
      return result;
    };

    const ranking = rank({ page, term, size: 1000 }, { searcher });

    expect(ranking).toEqual(
      expect.objectContaining({
        page,
        term,
        position: 10,
        when: expect.any(Date)
      })
    );
  });
});
