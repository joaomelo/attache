import { searchTerm } from './term';

export async function searchTerms ({ terms }, { search }) {
  const pendingSearches = [];
  terms.forEach(term => pendingSearches.push(searchTerm({ term }, { search })));

  const snapshotsArray = await Promise.all(pendingSearches);

  // create a hash map to better select searches results by term
  const snapshotsMap = new Map();
  snapshotsArray.forEach(c => snapshotsMap.set(c.term, c));

  return snapshotsMap;
}
