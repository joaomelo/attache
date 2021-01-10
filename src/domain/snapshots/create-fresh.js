import { filterWithoutFreshSnapshotFrom } from './filter-without-fresh';
import { createSnapshotsFor } from './create-snapshots';

export async function createFreshSnapshotsFor (terms, dependencies) {
  const termsWithoutFreshSnapshot = await filterWithoutFreshSnapshotFrom(terms, dependencies);
  const freshSnapshots = await createSnapshotsFor(termsWithoutFreshSnapshot, dependencies);
  return freshSnapshots;
}
