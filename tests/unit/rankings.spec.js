import { rankStakes } from '../../src/domain/rankings';
import { stakes, snapshots } from '../fixtures';

describe('rankings module', () => {
  test('correctly calculate rankings', () => {
    const rankings = rankStakes(stakes, snapshots);

    expect(rankings).toHaveLength(stakes.length);
    // shape assertion
  });

  test('disregards failed snapshots', () => {});
});
