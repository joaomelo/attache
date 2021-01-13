import { filterTermsWithoutFreshSnapshot } from './filter-without-fresh';
import { createSingleSnapshot } from './create-snapshot';

export async function createFreshSnapshots (terms, dependencies) {
  const termsWithoutFreshSnapshot = await filterTermsWithoutFreshSnapshot(terms, dependencies);
  const freshSnapshots = await createSnapshots(termsWithoutFreshSnapshot, dependencies);
  return freshSnapshots;
}

async function createSnapshots (terms, dependencies) {
  const promises = [];
  terms.forEach(term => promises.push(createSingleSnapshot(term, dependencies)));

  const snapshots = await Promise.all(promises);
  return snapshots;
}
