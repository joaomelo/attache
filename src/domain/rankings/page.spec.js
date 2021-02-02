import { rankPage } from './page';

describe('rankPage', () => {
  const term = 'service';
  const when = new Date();
  const success = true;
  const size = 2;

  test('return ranking with correct position', () => {
    const page = 'www.another.com';
    const result = ['www.some.com', 'www.another.com'];
    const snapshot = { term, when, success, size, result };

    const ranking = rankPage({ page, snapshot });

    expect(ranking).toEqual(
      expect.objectContaining({
        id: expect.any(String),
        page,
        term,
        position: 1,
        size,
        when
      })
    );
  });

  test('mark position even if partial match', () => {
    const page = 'main.com';
    const result = ['www.blog.main.com', 'www.another.com'];
    const snapshot = { term, when, success, size, result };

    const ranking = rankPage({ page, snapshot });

    expect(ranking.position).toBe(0);
  });

  test('mark position as -1 if not found', () => {
    const page = 'main.com';
    const result = ['www.my-blog.com', 'www.another.com'];
    const snapshot = { term, when, success, size, result };

    const ranking = rankPage({ page, snapshot });

    expect(ranking.position).toBe(-1);
  });
})
;
