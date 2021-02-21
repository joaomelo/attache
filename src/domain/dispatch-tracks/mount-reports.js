export function mountReports (stakes, rankings, trends) {
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
};

function findRanking (rankings, term, page) {
  const ranking = rankings.find(r => r.page === page && r.term === term);
  return {
    page: ranking.page,
    positions: ranking.positions
  };
};
