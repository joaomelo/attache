import { rankStake } from './stake';

export function rankStakes (stakes = [], snapshots = []) {
  return stakes.map(stake => rankStake(stake, snapshots));
}
