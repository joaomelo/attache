import { rankPage } from './page';

export async function rankStakes ({ stakes, contexts }) {
  const rankings = new Map();

  stakes.forEach(stake => {
    stake.terms.forEach(term => {
      const context = contexts.get(term);
      const { result, size, when } = context;

      stake.pages.forEach(page => {
        const hash = `${page}::${term}`;

        const alreadyRanked = rankings.get(hash);
        if (alreadyRanked) return;

        const position = rankPage({ page, result });
        const ranking = { term, page, position, size, when };
        rankings.set(hash, ranking);
      });
    });
  });

  return rankings;
}
