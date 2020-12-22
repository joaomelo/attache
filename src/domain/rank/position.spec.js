import { calcPosition } from './position';

describe('position', () => {
  test('return position if literal', () => {
    const page = 'www.another.com';
    const searchResults = ['www.some.com', 'www.another.com'];

    const position = calcPosition(page, searchResults);
    expect(position).toBe(1);
  });

  test('return position even if partial match', () => {
    const page = 'main.com';
    const searchResults = ['www.blog.main.com', 'www.another.com'];

    const position = calcPosition(page, searchResults);
    expect(position).toBe(0);
  });

  test('return -1 if not found', () => {
    const page = 'www.blog.com';
    const searchResults = ['www.my-blog.com', 'www.another.com'];

    const position = calcPosition(page, searchResults);
    expect(position).toBe(-1);
  });
})
;
