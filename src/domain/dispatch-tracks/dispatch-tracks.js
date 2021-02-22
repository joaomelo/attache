import { fromToday } from '../../helpers';
import { createStakesCollection } from '../stakes';
import { createSnapshotsCollection } from '../snapshots';
import { mountTracks } from '../tracks';
import { convertTracksToMails } from './tracks-to-mail';
import { createDispatchedTracksCollection } from './collection';
import { dispatchMails } from './dispatch-mails';

export async function dispatchTracks ({ db, dispatch, logger }) {
  let dispatchedMail = 0;

  const stakesCol = createStakesCollection(db);
  const stakes = await await stakesCol.queryAll();
  if (stakes.length === 0) {
    logger.info('no stakes found for rankings dispatch');
    return dispatchedMail;
  };

  const snapshotsCol = createSnapshotsCollection(db);
  const lastWeek = fromToday(-7);
  const snapshots = await await snapshotsCol.querySuccessfulSince(lastWeek);
  if (snapshots.length === 0) {
    logger.info('no snapshots found for rankings dispatch');
    return dispatchedMail;
  };

  const tracks = mountTracks(stakes, snapshots);
  const mails = convertTracksToMails(tracks);

  const dtCol = createDispatchedTracksCollection(db);
  const lastTwoDays = fromToday(-2);
  const sentMails = await dtCol.querySince(lastTwoDays);

  const pendingMail = mails.filter(m => !sentMails.find(s => s.stakeId === m.stakeId && s.to === m.to));
  dispatchedMail = await dispatchMails(pendingMail, { dispatch });

  dtCol.save(dispatchedMail.map(d => ({ stakeId: d.stakeId, to: d.to, when: new Date() })));

  logger.info(`rankings cycle finished with ${dispatchedMail.length} dispatches`);

  return dispatchedMail.length;
}
