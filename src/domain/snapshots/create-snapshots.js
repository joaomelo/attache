import { createSnapshotFor } from './create-snapshot';

export async function createSnapshotsFor (terms, dependencies) {
  const promises = [];
  terms.forEach(term => promises.push(createSnapshotFor(term, dependencies)));

  const snapshots = await Promise.all(promises);
  return snapshots;
}
