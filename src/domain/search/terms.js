import { searchTerm } from './term';

export async function searchTerms ({ terms }, { search }) {
  const pendingSearches = [];
  terms.forEach(term => pendingSearches.push(searchTerm({ term }, { search })));

  const searchesResults = await Promise.all(pendingSearches);
  return searchesResults;
}
