import { extractTrends } from '../trends';
import { rankPagesInTerms } from '../rankings';
import { tupleTermsAndPages } from '../stakes';

export function mountTracks (stakes, snapshots) {
  const tuples = tupleTermsAndPages(stakes);
  const rankings = rankPagesInTerms(tuples, snapshots);
  const trends = extractTrends(snapshots);

  return stakes.map(s => {
    return {
      stake: { ...s },
      terms: s.terms.map(t => {
        return {
          term: t,
          trend: trends[t],
          rankings: s.pages.map(p => findRanking(rankings, t, p))
        };
      })
    };
  });
}

function findRanking (rankings, term, page) {
  const ranking = rankings.find(r => r.page === page && r.term === term);
  return {
    page: ranking.page,
    positions: ranking.positions
  };
};
