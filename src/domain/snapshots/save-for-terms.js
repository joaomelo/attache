import { filterTermsWithoutFreshSnapshot } from './filter-without-fresh';
import { createSingleSnapshot } from './create-snapshot';

export async function saveFreshSnapshotsForTerms (terms, db, search) {
  const termsWithoutFreshSnapshot = await filterTermsWithoutFreshSnapshot(terms, db);
  const freshSnapshots = await createSnapshots(termsWithoutFreshSnapshot, search);

  await db.saveSnapshots(freshSnapshots);
}

async function createSnapshots (terms, search) {
  const promises = [];
  terms.forEach(term => promises.push(createSingleSnapshot(term, search)));

  const snapshots = await Promise.all(promises);
  return snapshots;
}
