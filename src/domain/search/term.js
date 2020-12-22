export async function searchTerm ({ term }, { search }) {
  const context = await search(term);
  context.term = term;
  context.when = new Date();

  return context;
}
