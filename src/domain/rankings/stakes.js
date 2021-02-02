import { rankPage } from './page';

export function rankStakes ({ stakes, snapshots, cache = [] }) {
  const rankings = [];

  stakes.forEach(stake => {
    stake.terms.forEach(term => {
      const snapshot = snapshots.find(s => s.term === term);
      if (!snapshot || !snapshot.success) return;

      stake.pages.forEach(page => {
        const isAlreadyRanked = findRanking(page, term, rankings);
        if (isAlreadyRanked) return;

        const cachedRanking = findRanking(page, term, cache);
        const ranking = cachedRanking || rankPage({ page, snapshot });
        rankings.push(ranking);
      });
    });
  });

  return rankings;
}

function findRanking (page, term, rankings) {
  return rankings.find(r => r.page === page && r.term === term);
}
