import { searchTerm } from './term';

export async function searchTerms ({ terms }, { search }) {
  const pendingSearches = [];
  terms.forEach(term => pendingSearches.push(searchTerm({ term }, { search })));

  const contextsArray = await Promise.all(pendingSearches);

  // create a hash map to better select searches results by term
  const contextsMap = new Map();
  contextsArray.forEach(c => contextsMap.set(c.term, c));

  return contextsMap;
}
