import { calcToday } from '../../helpers';
import { snapshotTerms } from './snapshot-terms';
import { rankStakes } from './rank-stakes';

export async function cycleRank ({ db, search }) {
  const stakes = await db.queryStakes();

  const termsSet = new Set();
  stakes.forEach(stake => stake.terms.forEach(term => termsSet.add(term)));
  const terms = Array.from(termsSet.values());

  const todaySnapshots = await db.querySnapshotsSince(calcToday());
  const snapshotsCache = todaySnapshots.filter(s => s.success);

  const snapshots = await snapshotTerms({ terms, cache: snapshotsCache }, { search });

  const newSnapshots = snapshots.filter(s => !snapshotsCache.find(t => t.term === s.term));

  const rankings = rankStakes({ stakes, snapshots });
  const newRankings = rankings;

  await Promise.all([
    db.saveRankings(newRankings),
    db.saveSnapshots(newSnapshots)
  ]);

  return { rankings, snapshots };
}
