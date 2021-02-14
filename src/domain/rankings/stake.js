import { serializePagePositions } from './page';

export function rankStake (stake, snapshots) {
  const ranking = {
    stake: { ...stake }
  };

  ranking.terms = stake.terms.map(term => {
    const termSnapshots = snapshots.filter(s => s.success && s.term === term);
    const pages = stake.pages.map(page => serializePagePositions(page, termSnapshots));
    return {
      term,
      pages
    };
  });

  return ranking;
};
