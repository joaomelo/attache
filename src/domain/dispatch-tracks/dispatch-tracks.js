import { fromToday } from '../../helpers';
import { createStakesCollection } from '../stakes';
import { createSnapshotsCollection } from '../snapshots';
import { mountTracks } from '../tracks';
import { convertTracksToMails } from './tracks-to-mail';
import { dispatchMails } from './dispatch-mails';

export async function dispatchTracks ({ db, dispatch, logger }) {
  let dispatches = 0;

  const stakesCol = createStakesCollection(db);
  const stakes = await await stakesCol.queryAll();
  if (stakes.length === 0) {
    logger.info('no stakes found for rankings dispatch');
    return dispatches;
  };

  const snapshotsCol = createSnapshotsCollection(db);
  const lastWeek = fromToday(-7);
  const snapshots = await await snapshotsCol.querySuccessfulSince(lastWeek);
  if (snapshots.length === 0) {
    logger.info('no snapshots found for rankings dispatch');
    return dispatches;
  };

  const tracks = mountTracks(stakes, snapshots);
  const mails = convertTracksToMails(tracks);

  dispatches = await dispatchMails(mails, { dispatch });
  logger.info(`rankings cycle finished with ${dispatches.length} dispatches`);

  return dispatches.length;
}
