import { filterTermsWithoutFreshSnapshot } from './filter-without-fresh';
import { createSnapshots } from './create-snapshots';

export async function createFreshSnapshots (terms, dependencies) {
  const termsWithoutFreshSnapshot = await filterTermsWithoutFreshSnapshot(terms, dependencies);
  const freshSnapshots = await createSnapshots(termsWithoutFreshSnapshot, dependencies);
  return freshSnapshots;
}
