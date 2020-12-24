import { rankPage } from './page';

export function rankStakes ({ stakes, snapshots }) {
  const rankings = new Map();

  stakes.forEach(stake => {
    stake.terms.forEach(term => {
      const snapshot = snapshots.get(term);
      if (!snapshot || !snapshot.success) return;

      const { result, size, when } = snapshot;

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
