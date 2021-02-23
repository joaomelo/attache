import { fromToday } from '../../helpers';
import { createStakesCollection } from '../stakes';
import { createSnapshotsCollection } from '../snapshots';
import { createDispatchedTracksCollection } from './collection';
import { determinePendingMail } from './pending-mail';
import { dispatchMail } from './dispatch-mail';

export async function dispatchTracks ({ db, dispatch, logger }) {
  let dispatchedQt = 0;

  const stakesCol = createStakesCollection(db);
  const stakes = await stakesCol.queryAll();
  if (stakes.length === 0) {
    logger.info('no stakes found for rankings dispatch');
    return dispatchedQt;
  };

  const snapshotsCol = createSnapshotsCollection(db);
  const lastWeek = fromToday(-7);
  const snapshots = await snapshotsCol.querySuccessfulSince(lastWeek);
  if (snapshots.length === 0) {
    logger.info('no snapshots found for rankings dispatch');
    return dispatchedQt;
  };

  const dtCol = createDispatchedTracksCollection(db);
  const lastTwoDays = fromToday(-2);
  const sentMail = await dtCol.querySince(lastTwoDays);

  const pendingMail = determinePendingMail(stakes, snapshots, sentMail);

  const dispatchedMail = await dispatchMail(pendingMail, { dispatch });
  dtCol.save(dispatchedMail);

  dispatchedQt = dispatchedMail.length;
  logger.info(`rankings cycle finished with ${dispatchedQt} dispatches`);

  return dispatchedQt;
}
