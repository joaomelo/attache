import { createId } from '../../helpers';

export async function snapshotTerm ({ term, cache }, { search }) {
  const cachedSnapshot = cache && cache.find(s => s.term === term && s.success);
  if (cachedSnapshot) return cachedSnapshot;

  const freshSnapshot = {
    id: createId(),
    term: term,
    when: new Date()
  };

  try {
    const { result, size } = await search(term);
    if (!Array.isArray(result) || isNaN(size)) throw new Error('Invalid search data');

    freshSnapshot.result = result;
    freshSnapshot.size = size;
    freshSnapshot.success = true;
  } catch (error) {
    freshSnapshot.success = false;
    freshSnapshot.error = error.message;
  }

  return freshSnapshot;
}
