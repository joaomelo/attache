export async function searchTerm ({ term }, { search }) {
  const searchResult = await search(term);
  searchResult.when = new Date();

  return searchResult;
}
