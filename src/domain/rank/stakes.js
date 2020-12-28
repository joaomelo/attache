import { rankPage } from './page';

export function rankStakes ({ stakes, snapshots }) {
  const stakesRankings = new Map();

  stakes.forEach(stake => {
    stake.terms.forEach(term => {
      const snapshot = snapshots.find(s => s.term === term);
      if (!snapshot || !snapshot.success) return;

      stake.pages.forEach(page => {
        const hash = `${page}::${term}`;

        const isAlreadyRanked = stakesRankings.get(hash);
        if (isAlreadyRanked) return;

        const ranking = rankPage({ page, snapshot });
        stakesRankings.set(hash, ranking);
      });
    });
  });

  const rankings = Array.from(stakesRankings.values());
  return rankings;
}
