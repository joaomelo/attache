export async function searchTerm ({ term }, { search }) {
  const snapshot = {
    term: term,
    when: new Date()
  };

  try {
    const { result, size } = await search(term);
    if (!Array.isArray(result) || isNaN(size)) throw new Error('Invalid search data');

    snapshot.result = result;
    snapshot.size = size;
    snapshot.success = true;
  } catch (error) {
    snapshot.success = false;
    snapshot.error = error.message;
  }

  return snapshot;
}
