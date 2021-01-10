import { calcToday } from '../../helpers';
import { snapshotTerms } from '../snapshot';
import { rankStakes } from './stakes';

export async function cycleRank ({ db, search }) {
  const today = calcToday();

  const stakes = await db.queryStakes();

  const termsSet = new Set();
  stakes.forEach(stake => stake.terms.forEach(term => termsSet.add(term)));
  const terms = Array.from(termsSet.values());

  const todaySnapshots = await db.querySnapshotsSince(today);
  const snapshotsCache = todaySnapshots.filter(s => s.success);
  const snapshots = await snapshotTerms({ terms, cache: snapshotsCache }, { search });
  const freshSnapshots = snapshots.filter(s => !snapshotsCache.find(c => c.id === s.id));

  const rankingsCache = await db.queryRankingsSince(today);
  const rankings = rankStakes({ stakes, snapshots, cache: rankingsCache });
  const newRankings = rankings.filter(r => !rankingsCache.find(c => c.id === r.id));

  await Promise.all([
    db.saveRankings(newRankings),
    db.saveSnapshots(freshSnapshots)
  ]);

  return { rankings, newRankings, snapshots, freshSnapshots };
}
