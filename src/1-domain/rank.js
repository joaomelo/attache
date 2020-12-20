import { calcPosition } from './position';

export async function rank ({ page, term, size }, { searcher }) {
  const search = await searcher.search(term, size);
  const position = calcPosition(page, search);

  const ranking = {
    when: new Date(),
    page,
    term,
    position
  };

  return ranking;
}
