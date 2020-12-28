import { searchTerm } from './term';

export async function searchStakes ({ stakes, cache }, { search }) {
  const terms = new Set();
  stakes.forEach(stake => stake.terms.forEach(term => terms.add(term)));

  const pendingSearches = [];
  terms.forEach(term => pendingSearches.push(searchTerm({ term, cache }, { search })));

  const snapshots = await Promise.all(pendingSearches);

  return snapshots;
}
