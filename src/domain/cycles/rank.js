import { calcToday } from '../../helpers';
import { searchStakes } from '../snapshot';
import { rankStakes } from '../rank';

export async function cycleRank ({ db, search }) {
  const stakes = await db.queryStakes();

  const snapshotsCache = await db.querySnapshotsSince(calcToday());
  const snapshots = await searchStakes({ stakes, cache: snapshotsCache }, { search });

  const rankings = rankStakes({ stakes, snapshots });

  await Promise.all([
    db.saveRankings(rankings),
    db.saveSnapshots(snapshots)
  ]);

  return { rankings, snapshots };
}
