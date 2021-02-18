import { stakes, snapshots } from '../../../tests/fixtures';
import { rankStake } from './stake';

describe('rankStake', () => {
  test('correctly calculate stake ranking', () => {
    const stake = stakes[0];

    const ranking = rankStake(stake, snapshots);

    expect(ranking).toEqual(
      expect.objectContaining({
        stake,
        terms: expect.any(Array)
      })
    );

    expect(ranking.terms).toHaveLength(2);
    expect(ranking.terms).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          term: expect.any(String),
          pages: expect.any(Array)
        })
      ])
    );
  });
});
