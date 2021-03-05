import { accIfResults } from '../../helpers';
import { extractTrends } from '../trends';
import { rankPagesInTerms } from '../rankings';
import { tupleTermsAndPages } from '../stakes';
import { mountTerm } from './mount-terms';

export function mountTracks (stakes, snapshots) {
  const tuples = tupleTermsAndPages(stakes);
  const rankings = rankPagesInTerms(tuples, snapshots);
  const trends = extractTrends(snapshots);

  return stakes
    .map(s => ({
      stake: { ...s },
      terms: accIfResults(s.terms, mountTerm, s.pages, trends, rankings)
    }))
    .filter(t => t.terms.length > 0);
}
