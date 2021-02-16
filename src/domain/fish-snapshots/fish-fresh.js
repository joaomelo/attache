import { calcToday } from '../../helpers';
import { createStakesCollection } from '../stakes';
import { createSnapshotsCollection } from '../snapshots';
import { filterTermsWithoutSnapshot } from './filter-terms';
import { fishTermsSnapshots } from './fish-terms';

export async function fishFreshSnapshots ({ db, search, logger }) {
  const stakesCol = createStakesCollection(db);
  const snapshotsCol = createSnapshotsCollection(db);
  let savedSnapshots = 0;

  const terms = await stakesCol.queryTerms();
  if (terms.length === 0) {
    logger.info('no terms found for snapshot taking');
    return savedSnapshots;
  };

  const todaySnapshots = await snapshotsCol.querySuccessfulSince(calcToday());
  const pendingTerms = filterTermsWithoutSnapshot(terms, todaySnapshots);

  const newSnapshots = await fishTermsSnapshots(pendingTerms, { search });
  await snapshotsCol.save(newSnapshots);

  savedSnapshots = newSnapshots.length;
  logger.info(`fishing cycle finished with ${savedSnapshots} fresh snapshots saved`);

  return savedSnapshots;
};
