import { research } from './research';

describe('research', () => {
  test('return correct report', () => {
    const pages = ['company.com', 'www.landing-page.com'];
    const terms = ['service', 'service my-city'];
    const searcher = (term, size) => {
      const result = Array(size).fill('www.site.com');
      result[10] = 'company.com';
      result[500] = 'www.landing-page.com';
      return result;
    };

    const rankings = research({ pages, terms }, { searcher });

    expect(report).toEqual(
      expect.objectContaining({
        page,
        term,
        position: 10,
        when: expect.any(Date)
      })
    );
  });
});
