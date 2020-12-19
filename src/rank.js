import { calcPosition } from './position';

export function rank ({ stake }, { searcher }) {
  const rankings = {};

  const searches = {};

  stake.terms.forEach(term => {
    searches[term] = searcher(term, 1000);
  });

  stake.pages.forEach(page => {
    rankings[page] = {};
    stake.terms.forEach(term => {
      rankings[page][term] = calcPosition(page, searches[term]);
    });
  });

  return rankings;
}
