import { calcSomedayFromToday } from '../helpers';
import { rankStakes } from '../domain/rankings';

export async function dispatchFreshRankingsForStakes ({ db, dispatcher, logger }) {
  let dispatchedRankings = 0;

  const stakes = await db.queryStakes();
  if (stakes.length === 0) {
    logger.info('no stakes found for rankings dispatch');
    return dispatchedRankings;
  };

  const lastWeek = calcSomedayFromToday(-7);
  const snapshots = await db.querySnapshotsSince(lastWeek);
  if (snapshots.length === 0) {
    logger.info('no snapshots found for rankings dispatch');
    return dispatchedRankings;
  };

  const rankings = rankStakes(stakes, snapshots);

  dispatchedRankings = await dispatchRankings(rankings, { dispatcher });
  logger.info(`rankings cycle finished with ${dispatchedRankings} dispatches`);

  return dispatchedRankings;
}

async function dispatchRankings (rankings, { dispatcher }) {
  const promises = rankings.map(ranking => dispatcher.send(ranking));
  const results = await Promise.all(promises);
  return results.length;
}
