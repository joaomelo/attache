import { createStakesCollection } from '../stakes';
import { createSnapshotsCollection } from '../snapshots';
import { filterTermsWithoutSnapshot } from './filter-terms';
import { fishTermsSnapshots } from './fish-terms';

export async function fishFreshSnapshots ({ db, search }) {
  const stakesCol = createStakesCollection(db);
  const terms = await stakesCol.queryTerms();

  const snapshotsCol = createSnapshotsCollection(db);
  const todaySnapshots = await snapshotsCol.querySuccessfulLastDays();

  const pendingTerms = filterTermsWithoutSnapshot(terms, todaySnapshots);

  const newSnapshots = await fishTermsSnapshots(pendingTerms, { search });
  await snapshotsCol.save(newSnapshots);

  return newSnapshots.length;
};
