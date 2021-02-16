import { createId } from '../../helpers';

export async function fishSnapshot (term, { search }) {
  const freshSnapshot = {
    id: createId(),
    term,
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
