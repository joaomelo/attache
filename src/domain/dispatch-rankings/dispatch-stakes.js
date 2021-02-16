import { fromToday } from '../../helpers';
import { createRankings } from '../rankings';
import { createStakesCollection } from '../stakes';
import { createSnapshotsCollection } from '../snapshots';
import { dispatchRankings } from './dispatch-rankings';

export async function dispatchFreshRankingsForStakes ({ db, dispatch, logger }) {
  const stakesCol = createStakesCollection(db);
  const snapshotsCol = createSnapshotsCollection(db);
  let dispatches = 0;

  const stakes = await await stakesCol.queryAll();
  if (stakes.length === 0) {
    logger.info('no stakes found for rankings dispatch');
    return dispatches;
  };

  const lastWeek = fromToday(-7);
  const snapshots = await await snapshotsCol.querySuccessfulSince(lastWeek);
  if (snapshots.length === 0) {
    logger.info('no snapshots found for rankings dispatch');
    return dispatches;
  };

  const rankings = createRankings(stakes, snapshots);

  dispatches = await dispatchRankings(rankings, { dispatch });
  logger.info(`rankings cycle finished with ${dispatches.length} dispatches`);

  return dispatches.length;
}
