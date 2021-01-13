import { createSingleSnapshot } from './create-single';

export async function createSnapshots (terms, dependencies) {
  const promises = [];
  terms.forEach(term => promises.push(createSingleSnapshot(term, dependencies)));

  const snapshots = await Promise.all(promises);
  return snapshots;
}
