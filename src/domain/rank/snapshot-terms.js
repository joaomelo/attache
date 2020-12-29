import { snapshotTerm } from './snapshot-term';

export async function snapshotTerms ({ terms, cache }, { search }) {
  const promises = [];
  terms.forEach(term => promises.push(snapshotTerm({ term, cache }, { search })));

  const snapshots = await Promise.all(promises);

  return snapshots;
}
