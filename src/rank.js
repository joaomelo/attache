import { calcPosition } from './position';

export function rank ({ page, term, size }, { searcher }) {
  const ranking = {
    when: new Date(),
    page,
    term
  };

  const search = searcher(term, size);
  ranking.position = calcPosition(page, search);

  return ranking;
}
