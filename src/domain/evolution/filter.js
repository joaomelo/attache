export function filterRankings ({ rankings, page, term, start, end }) {
  const filteredRankings = rankings.filter(r =>
    r.page === page &&
    r.term === term &&
    r.when >= start &&
    r.when <= end);

  return filteredRankings;
}
