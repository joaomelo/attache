import { fromToday } from '../../helpers';
import { rankStakes } from '../rankings';
import { dispatchRankings } from './dispatch-rankings';
import { saveRankingsDispatches } from './save-dispatches';

export async function dispatchFreshRankingsForStakes ({ db, dispatch, logger }) {
  let dispatches = 0;

  const stakes = await db.queryStakes();
  if (stakes.length === 0) {
    logger.info('no stakes found for rankings dispatch');
    return dispatches;
  };

  const lastWeek = fromToday(-7);
  const snapshots = await db.querySnapshotsSince(lastWeek);
  if (snapshots.length === 0) {
    logger.info('no snapshots found for rankings dispatch');
    return dispatches;
  };

  const rankings = rankStakes(stakes, snapshots);

  dispatches = await dispatchRankings(rankings, { dispatch });
  await saveRankingsDispatches(dispatches);
  logger.info(`rankings cycle finished with ${dispatches.length} dispatches`);

  return dispatches.length;
}
