import { research } from './research';

describe('research', () => {
  test('return position if literal', () => {
    const page = 'www.another.com';
    const searchResult = ['www.some.com', 'www.another.com'];

    const position = calcPosition(page, searchResult);
    expect(position).toBe(1);
  });
  test('return position even if partial match', () => {
    const page = 'main.com';
    const searchResult = ['www.blog.main.com', 'www.another.com'];

    const position = calcPosition(page, searchResult);
    expect(position).toBe(0);
  });
  test('return -1 if not found', () => {
    const page = 'www.blog.com';
    const searchResult = ['www.my-blog.com', 'www.another.com'];

    const position = calcPosition(page, searchResult);
    expect(position).toBe(-1);
  });
})
;
