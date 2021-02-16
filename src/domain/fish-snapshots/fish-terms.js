import { fishSnapshot } from './fish-snapshot';

export async function fishTermsSnapshots (terms, { search }) {
  const promises = terms.map(t => fishSnapshot(t, { search }));
  const snapshots = await Promise.all(promises);
  return snapshots;
}
