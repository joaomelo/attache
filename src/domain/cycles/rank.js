import { searchStakes } from '../snapshot';
import { rankStakes } from '../rank';

export async function cycleRank ({ db, search }) {
  const stakes = await db.queryStakes();

  const snapshots = await searchStakes({ stakes }, { search });
  const rankings = rankStakes({ stakes, snapshots });

  await Promise.all([
    db.saveRankings(rankings),
    db.saveSnapshots(snapshots)
  ]);

  return { rankings, snapshots };
}
