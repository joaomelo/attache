import { snapshots } from '../../../tests/fixtures';
import { extractTrends } from './extract';

describe('extract trends from snapshots', () => {
  test('return object with a key for every term with at least one successful snapshot', () => {
    const trends = extractTrends(snapshots);
    expect(Object.keys(trends)).toEqual(['cloud', 'serverless']);
  });

  test('every trend value will be an array with date and the first search result', () => {
    const trends = extractTrends(snapshots);

    Object.values(trends).forEach(t =>
      expect(t).toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            when: expect.any(Date),
            page: expect.any(String)
          })
        ])
      )
    );
  });
});
