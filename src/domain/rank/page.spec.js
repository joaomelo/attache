import { rankPage } from './page';

describe('position', () => {
  test('return position if literal', () => {
    const page = 'www.another.com';
    const result = ['www.some.com', 'www.another.com'];

    const position = rankPage({ page, result });
    expect(position).toBe(1);
  });

  test('return position even if partial match', () => {
    const page = 'main.com';
    const result = ['www.blog.main.com', 'www.another.com'];

    const position = rankPage({ page, result });
    expect(position).toBe(0);
  });

  test('return -1 if not found', () => {
    const page = 'www.blog.com';
    const result = ['www.my-blog.com', 'www.another.com'];

    const position = rankPage({ page, result });
    expect(position).toBe(-1);
  });
})
;
