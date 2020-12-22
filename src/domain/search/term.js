export async function searchTerm ({ term }, { search }) {
  const searchResult = await search(term);
  searchResult.term = term;
  searchResult.when = new Date();

  return searchResult;
}
