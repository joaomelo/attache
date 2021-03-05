import { createStakesCollection } from '../stakes';
import { createSnapshotsCollection } from '../snapshots';
import { mountTracks } from '../tracks';
import { createDispatchedTracksCollection } from './collection';
import { createPendingMail } from './pending-mail';
import { dispatchMail } from './dispatch-mail';

export async function dispatchTracks ({ db, dispatch, render }) {
  const stakesCol = createStakesCollection(db);
  const stakes = await stakesCol.queryAll();

  const snapshotsCol = createSnapshotsCollection(db);
  const snapshots = await snapshotsCol.querySuccessfulLastDays(7);

  const tracks = mountTracks(stakes, snapshots);

  const dtCol = createDispatchedTracksCollection(db);
  const sentMail = await dtCol.queryLastDays(2);

  const pendingMail = createPendingMail(tracks, sentMail, { render });
  const dispatchedMail = await dispatchMail(pendingMail, { dispatch });

  await dtCol.save(dispatchedMail);

  return dispatchedMail.length;
}
