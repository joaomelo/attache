import { rankStake } from './stake';

export function createRankings (stakes = [], snapshots = []) {
  return stakes.map(stake => rankStake(stake, snapshots));
}
