import { calcToday } from '../../helpers';
import { rankStakes } from './stakes';

export async function cycleRank ({ db, search }) {
  const today = calcToday();

  const stakes = await db.queryStakes();

  const rankingsCache = await db.queryRankingsSince(today);
  const rankings = rankStakes({ stakes, snapshots, cache: rankingsCache });
  const newRankings = rankings.filter(r => !rankingsCache.find(c => c.id === r.id));

  await Promise.all([
    db.saveRankings(newRankings)
  ]);

  return { rankings, newRankings };
}
