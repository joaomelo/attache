import { fromToday } from '../../helpers';
import { extractTrends } from '../trends';
import { rankPagesInTerms } from '../rankings';
import { createStakesCollection, tupleTermsAndPages } from '../stakes';
import { createSnapshotsCollection } from '../snapshots';
import { mountReports } from './mount-reports';
import { convertReportsToMails } from './reports-to-mail';
import { dispatchMails } from './dispatch-mails';

export async function dispatchTracksReports ({ db, dispatch, logger }) {
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

  const tuples = tupleTermsAndPages(stakes);
  const rankings = rankPagesInTerms(tuples, snapshots);
  const trends = extractTrends(snapshots);
  const reports = mountReports(stakes, rankings, trends);
  const mails = convertReportsToMails(reports);

  dispatches = await dispatchMails(mails, { dispatch });
  logger.info(`rankings cycle finished with ${dispatches.length} dispatches`);

  return dispatches.length;
}
