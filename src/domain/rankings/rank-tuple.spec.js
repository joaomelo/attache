import { stakes, snapshots } from '../../../tests/fixtures';
import { rankPageInTerm } from './rank-tuple';

describe('rankPageInTerm', () => {
  test('correctly calculate page term ranking', () => {
    const term = stakes[0].terms[0];
    const page = stakes[0].pages[0];
    const tuple = [term, page];

    const ranking = rankPageInTerm(tuple, snapshots);

    expect(ranking).toEqual(
      expect.objectContaining({
        term,
        page,
        positions: expect.any(Array)
      })
    );
  });
});
