import { accIfResults } from '../../helpers';

export function mountTerm (term, pages, trends, rankings) {
  const termTrack = {};

  if (trends[term]) {
    termTrack.trend = trends[term];
  }

  const termRankings = rankings.filter(r => r.term === term);
  const pagesRankings = accIfResults(pages, mountPageRanking, termRankings);
  if (pagesRankings.length > 0) {
    termTrack.rankings = pagesRankings;
  }

  return Object.keys(termTrack).length > 0
    ? { term, ...termTrack }
    : null;
}

function mountPageRanking (page, rankings) {
  const ranking = rankings.find(r => r.page === page);
  return ranking.positions.length > 0
    ? { page, positions: ranking.positions }
    : null;
};
