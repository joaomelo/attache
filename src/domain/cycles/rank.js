import { searchStakes } from '../snapshot';
import { rankStakes } from '../rank';

export async function cycleRank ({ db, search }) {
  const stakes = await db.queryStakes();

  const snapshots = await searchStakes({ stakes }, { search });
  const rankings = rankStakes({ stakes, snapshots });

  await db.saveRankings(rankings);

  return rankings;
}
