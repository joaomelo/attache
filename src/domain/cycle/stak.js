import { searchTerm } from './term';

export async function searchStakes ({ stakes }, { search }) {
  const terms = new Set();
  stakes.forEach(stake => stake.terms.forEach(term => terms.add(term)));

  const pendingSearches = [];
  terms.forEach(term => pendingSearches.push(searchTerm({ term }, { search })));

  const searchesResults = await Promise.all(pendingSearches);
  return searchesResults;
}
