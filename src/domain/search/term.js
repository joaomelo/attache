export async function searchTerm ({ term }, { search }) {
  const snapshot = await search(term);
  snapshot.term = term;
  snapshot.when = new Date();

  return snapshot;
}
