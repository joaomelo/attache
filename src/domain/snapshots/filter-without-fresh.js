import { loadFreshSnapshots } from './load-fresh';

export async function filterWithoutFreshSnapshotFrom (terms, dependencies) {
  const freshSnapshots = await loadFreshSnapshots(dependencies);

  const isFresh = term => !!freshSnapshots.find(s => s.term === term);
  const termsWithoutFreshSnapshot = terms.filter(t => !isFresh(t));

  return termsWithoutFreshSnapshot;
}
